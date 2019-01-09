import React from 'react';
import { view } from 'react-easy-state';
import { RouteComponentProps, withRouter } from 'react-router';
import { Row, Col, Card, Alert, Button, Collapse, Popconfirm, Modal, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import store from 'src/store';
import { formatDateSeconds } from 'util/time';
import { PROPOSAL_STATUS } from 'src/types';
import { Link } from 'react-router-dom';
import './index.less';
import Markdown from 'components/Markdown';

type Props = RouteComponentProps<any>;

const STATE = {
  showRejectModal: false,
  rejectReason: '',
};

type State = typeof STATE;

class ProposalDetailNaked extends React.Component<Props, State> {
  state = STATE;
  rejectInput: null | TextArea = null;
  componentDidMount() {
    this.loadDetail();
  }
  render() {
    const id = this.getIdFromQuery();
    const { proposalDetail: p, proposalDetailFetching, proposalDetailApproving } = store;
    const { rejectReason, showRejectModal } = this.state;

    if (!p || (p && p.proposalId !== id) || proposalDetailFetching) {
      return 'loading proposal...';
    }

    const renderDelete = () => (
      <Popconfirm
        onConfirm={this.handleDelete}
        title="Delete proposal?"
        okText="delete"
        cancelText="cancel"
      >
        <Button icon="delete" block>
          Delete
        </Button>
      </Popconfirm>
    );

    const renderApproved = () =>
      p.status === PROPOSAL_STATUS.APPROVED && (
        <Alert
          showIcon
          type="success"
          message={`Approved on ${formatDateSeconds(p.dateApproved)}`}
          description={`
            This proposal has been approved and will become live when a team-member
            publishes it.
          `}
        />
      );

    const rejectModal = (
      <Modal
        visible={showRejectModal}
        title="Reject this proposal"
        onOk={this.handleReject}
        onCancel={() => this.setState({ showRejectModal: false })}
        okButtonProps={{
          disabled: rejectReason.length === 0,
          loading: proposalDetailApproving,
        }}
        cancelButtonProps={{
          loading: proposalDetailApproving,
        }}
      >
        Please provide a reason ({!!rejectReason.length && `${rejectReason.length}/`}
        250 chars max):
        <Input.TextArea
          ref={ta => (this.rejectInput = ta)}
          rows={4}
          maxLength={250}
          required={true}
          value={rejectReason}
          onChange={e => {
            this.setState({ rejectReason: e.target.value });
          }}
        />
      </Modal>
    );

    const renderReview = () =>
      p.status === PROPOSAL_STATUS.PENDING && (
        <Alert
          showIcon
          type="warning"
          message="Review Pending"
          description={
            <div>
              <p>Please review this proposal and render your judgment.</p>
              <Button
                loading={store.proposalDetailApproving}
                icon="check"
                type="primary"
                onClick={this.handleApprove}
              >
                Approve
              </Button>
              <Button
                loading={store.proposalDetailApproving}
                icon="close"
                type="danger"
                onClick={() => {
                  this.setState({ showRejectModal: true });
                  // hacky way of waiting for modal to render in before focus
                  setTimeout(() => {
                    if (this.rejectInput) this.rejectInput.focus();
                  }, 200);
                }}
              >
                Reject
              </Button>
              {rejectModal}
            </div>
          }
        />
      );

    const renderRejected = () =>
      p.status === PROPOSAL_STATUS.REJECTED && (
        <Alert
          showIcon
          type="error"
          message="Rejected"
          description={
            <div>
              <p>
                This proposal has been rejected. The team will be able to re-submit it for
                approval should they desire to do so.
              </p>
              <b>Reason:</b>
              <br />
              <i>{p.rejectReason}</i>
            </div>
          }
        />
      );

    const renderDeetItem = (name: string, val: any) => (
      <div className="ProposalDetail-deet">
        <span>{name}</span>
        {val}
      </div>
    );

    return (
      <div className="ProposalDetail">
        <h1>{p.title}</h1>
        <Row gutter={16}>
          {/* MAIN */}
          <Col span={18}>
            {renderApproved()}
            {renderReview()}
            {renderRejected()}
            <Collapse defaultActiveKey={['brief', 'content']}>
              <Collapse.Panel key="brief" header="brief">
                {p.brief}
              </Collapse.Panel>

              <Collapse.Panel key="content" header="content">
                <Markdown source={p.content} />
              </Collapse.Panel>

              {/* TODO - comments, milestones, updates &etc. */}
              <Collapse.Panel key="json" header="json">
                <pre>{JSON.stringify(p, null, 4)}</pre>
              </Collapse.Panel>
            </Collapse>
          </Col>

          {/* RIGHT SIDE */}
          <Col span={6}>
            {/* ACTIONS */}
            <Card size="small">
              {renderDelete()}
              {/* TODO - other actions */}
            </Card>

            {/* DETAILS */}
            <Card title="details" size="small">
              {renderDeetItem('id', p.proposalId)}
              {renderDeetItem('created', formatDateSeconds(p.dateCreated))}
              {renderDeetItem('status', p.status)}
              {renderDeetItem('category', p.category)}
              {renderDeetItem('target', p.target)}
            </Card>

            {/* TEAM */}
            <Card title="Team" size="small">
              {p.team.map(t => (
                <Link key={t.userid} to={`/users/${t.userid}`}>
                  {t.displayName}
                </Link>
              ))}
            </Card>
            {/* TODO: contributors here? */}
          </Col>
        </Row>
      </div>
    );
  }

  private getIdFromQuery = () => {
    return Number(this.props.match.params.id);
  };

  private loadDetail = () => {
    store.fetchProposalDetail(this.getIdFromQuery());
  };

  private handleDelete = () => {
    if (!store.proposalDetail) return;
    store.deleteProposal(store.proposalDetail.proposalId);
  };

  private handleApprove = () => {
    store.approveProposal(true);
  };

  private handleReject = async () => {
    await store.approveProposal(false, this.state.rejectReason);
    this.setState({ showRejectModal: false });
  };
}

const ProposalDetail = withRouter(view(ProposalDetailNaked));
export default ProposalDetail;