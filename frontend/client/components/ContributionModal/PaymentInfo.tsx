import React, { ReactNode } from 'react';
import classnames from 'classnames';
import { Button, Form, Icon, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import QRCode from 'qrcode.react';
import { formatZcashCLI, formatZcashURI } from 'utils/formatters';
import { ContributionWithAddresses } from 'types';
import Loader from 'components/Loader';
import './PaymentInfo.less';
import CopyInput from 'components/CopyInput';

interface Props {
  contribution?: ContributionWithAddresses | Falsy;
  text?: ReactNode;
}

type SendType = 'sprout' | 'transparent';

interface State {
  sendType: SendType;
}

export default class PaymentInfo extends React.Component<Props, State> {
  state: State = {
    sendType: 'sprout',
  };

  render() {
    const { contribution, text } = this.props;
    const { sendType } = this.state;
    let address;
    let memo;
    let amount;
    let cli;
    let uri;

    if (contribution) {
      if (sendType !== 'transparent') {
        memo = contribution.addresses.memo;
      }
      address = contribution.addresses[sendType];
      amount = contribution.amount;
      cli = formatZcashCLI(address, amount, memo);
      uri = formatZcashURI(address, amount, memo);
    }

    return (
      <Form className="PaymentInfo" layout="vertical">
        <div className="PaymentInfo-text">
          {text ||
            `
            Thank you for contributing! Just send using whichever method works best for
            you, and we'll let you know when your contribution has been confirmed.
          `}
        </div>

        <Radio.Group
          className="PaymentInfo-types"
          onChange={this.handleChangeSendType}
          value={sendType}
        >
          <Radio.Button value="sprout">Z Address (Private)</Radio.Button>
          <Radio.Button value="transparent">T Address (Public)</Radio.Button>
        </Radio.Group>

        <div className="PaymentInfo-uri">
          <div className={classnames('PaymentInfo-uri-qr', !uri && 'is-loading')}>
            <span style={{ opacity: uri ? 1 : 0 }}>
              <QRCode value={uri || ''} />
            </span>
            {!uri && <Loader />}
          </div>
          <div className="PaymentInfo-uri-info">
            <CopyInput
              className="PaymentInfo-uri-info-input"
              label="Payment URI"
              value={uri}
              isTextarea
            />
            <Button type="ghost" size="large" href={uri} block>
              Open in Wallet <Icon type="link" />
            </Button>
          </div>
        </div>

        <div className="PaymentInfo-fields">
          <div className="PaymentInfo-fields-row">
            <CopyInput
              className="PaymentInfo-fields-row-address"
              label="Address"
              value={address}
            />
            {memo && <CopyInput label="Memo" value={memo} />}
          </div>
          <div className="PaymentInfo-fields-row">
            <CopyInput
              label="Zcash CLI command"
              help="Make sure you replace YOUR_ADDRESS with your actual address"
              value={cli}
            />
          </div>
        </div>
      </Form>
    );
  }

  handleChangeSendType = (ev: RadioChangeEvent) => {
    this.setState({ sendType: ev.target.value });
  };
}
