import React, {PureComponent} from 'react';
import cx from "classnames";


export default class Messages extends PureComponent {

  constructor(props) {
      super(props);

      this.handleMessageTabChange = this.handleMessageTabChange.bind(this);

      this.state = {
        activeTab: 'buy'
      }

  }

  handleMessageTabChange (tab) {
    this.setState({
      activeTab: tab
    })
  }

  render() {
    return (
        <div>
        
          <div className="message-type-container">
              <div onClick={() => this.handleMessageTabChange("buy")} className={cx([ "message-type-button t-sans ls-2 hover", { "message-type-button--active": this.state.activeTab === "buy" }])}>BUY MESSAGES</div>
              <div onClick={() => this.handleMessageTabChange("sell")} className={cx([ "message-type-button t-sans ls-2 hover", { "message-type-button--active": this.state.activeTab === "sell" }])}>SELL MESSAGES</div>
          </div>

        
        </div>
    );
  }
}