import React from 'react';
import PropTypes from 'prop-types';
import { getFilteredUserList } from '../../libs/ServerInteractionLib';

class Autocomplete extends React.Component {
    state = {
        usersList: [],
        dropdownIsOpened: false,
        filterText: '',
        _loading: false
    }

    componentDidMount = () => {
        this.setState({ filterText: this.props.value }, () => {
            this.setState({ filterText: this.props.value });
        });
        //TODO
        // add check if such user in server base
        // it'll br useful for making transaction from sample
        // in case the sample transaction is in base of made transactions but the user is removed already
    }

    

    nameChangeHandler = (event) => {
        const value = event.target.value;
        //check if input is empty
        // we make trim only if no other characters
        const filter = value.trim().length === 0 ? value.trim() : value;
        
        if(filter === '') 
            {
                //no need to call api func and all other stuff
                this.setState({ filterText: '', usersList: [] });
                this.props.onChange(null);
            }
            else
            {
        
                this.setState({ _loading: true });
                const { id_token } = this.props;
                getFilteredUserList(id_token, filter, (usersList) => {
                    if('status' in usersList) {
                        this.props.setErrorMessageToState('usersListError', 'Imposible to load correspondents list. Service unavalable.')
                    } else {
                        if(usersList.length > 0) {
                            this.setState({ filterText: filter, usersList }, () => {
                                //means we found one and only one name that fits
                                if(this.state.usersList.length === 1 
                                    && this.state.usersList[0].name.toLowerCase() === this.state.filterText.toLowerCase()) {
                                        this.setState({ dropdownIsOpened: false }, () => {
                                            //send data to parent component and clear 
                                            this.props.onChange(usersList[0]);
                                            this.setState({ usersList: [] });
                                        });
                                } else {
                                    this.props.onChange(null);
                                }
                            });
                            usersList.length > 0 && this.setState({ dropdownIsOpened: true });
                        }
                    }
                });

                this.setState({ _loading: false });
            }
    }

    selectUserNameByClick = (user) => {
        this.setState({ 
            usersList: [user], 
            filterText: user.name, 
            dropdownIsOpened: false });
        this.props.onChange(user);
    }

    render() {
        return (
            <div className="autocomplete__base">
                <input type="text" 
                    className="form-control"
                    onChange={ this.nameChangeHandler }
                    value={ this.state.filterText }
                />
                <div className={ `autocomplete__dropdown-download  
                    ${ this.state._loading ? 
                        'autocomplete__dropdown-download-show' : 
                        '' }`} >Loading...</div>
                <ul className={`autocomplete__dropdown ${ this.state.dropdownIsOpened ? 'autocomplete__dropdown-show' : ''}`}>
                    {
                        Object.keys(this.state.usersList).map((item, i) => {
                            return (
                                <li key={ i } className="autocomplete__dropdown__item"
                                    onClick={ () => this.selectUserNameByClick(this.state.usersList[item]) }
                                    >
                                    <span className="autocomplete__dropdown__item-text">
                                        { this.state.usersList[item].name }
                                    </span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

Autocomplete.propTypes = {
    items: PropTypes.string,
    setErrorMessageToState: PropTypes.func
}

export default Autocomplete;