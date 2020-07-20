import React from 'react';

export interface IMessageProps {
      message: string;
}

export interface IMessageState {

}

class Message extends React.Component<IMessageProps, IMessageState> {
    constructor(props: IMessageProps, state: IMessageState) {
        super(props);
        this.state = {

        }
    }

    render() {
           const { message} = this.props;
           return (
               <span>{message}</span>
           )
    }
}

export default Message;