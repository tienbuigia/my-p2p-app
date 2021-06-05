import React, { Component } from 'react';
import './ChatBox.css';
import { withWebRTC } from 'react-liowebrtc';

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMsg: ''
    };
  }
    
  generateChats = () => {
    if(this.chatBox) {
      setTimeout(() => { this.chatBox.scrollTop = this.chatBox.scrollHeight; }, 2);
    }
    return this.props.chatLog.map((item) => (
      <div className="chat" key={`chat-${item.name}-${item.timestamp}`}>
        <b className="name" style={{ color: item.alert ? '#888' : '#333' }}>{item.name}</b> <span className="msg">{item.message}</span>
      </div>
    ));
  }

  handleSend = (chatMsg) => {
    this.props.webrtc.shout('chat', chatMsg);
    this.props.onSend(chatMsg);
  }

  handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      this.handleSend(this.state.inputMsg);
      this.setState({ inputMsg: '' });
    }
  }

  handleInputChange = (evt) => this.setState({ inputMsg: evt.target.value });

  render() {
    const { chatLog } = this.props;
    return (
      <div className="container">
        <div className="chatHeader">
          <h1 className="title">P2P Chat Example</h1>
          <hr />
        </div>
        <div className="chatBox" ref={(div) => this.chatBox = div}>
          {chatLog.length ? this.generateChats() : (
            <div className="info">
              <p>Demo bài tập lớn mạng ngang hàng -Tiến đẹp trai- ♥</p>
            </div>
          )}
        </div>
        <hr />
        <div className="bottomBar">
          <input className="chatInput" type="text" placeholder="Nhập tin nhắn..." onKeyUp={this.handleKeyUp} onChange={this.handleInputChange} value={this.state.inputMsg} />
        </div>
      </div>
    );
  }
}

export default withWebRTC(ChatBox);