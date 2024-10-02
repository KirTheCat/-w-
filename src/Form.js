import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
        
        this.initialState = {
            name: '',
            last_name: '',
            email: ''
        };

        this.state = this.initialState;
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    onFormSubmit = event => {
        event.preventDefault();
        
        this.props.handleSubmit(this.state);
        this.setState(this.initialState);
    }

    render() {
        const { name, last_name, email } = this.state; 

        return (
            <form onSubmit={this.onFormSubmit}>
                <label for="name">Имя</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name"
                    value={name} 
                    onChange={this.handleChange} />
                <label for="last_name">Фамилия</label>
                <input 
                    type="text" 
                    name="last_name" 
                    id="last_name"
                    value={last_name} 
                    onChange={this.handleChange} />
                <label for="email">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email"
                    value={email} 
                    onChange={this.handleChange} />
                <button type="submit">
                    Подтвердить
                </button>
            </form>
        );
    }
}

export default Form;