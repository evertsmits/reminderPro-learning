import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders} from "../actions";
import moment from 'moment';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
            dueDate: ''
        }
    }

    /**
     * helper functions. Deze kunnen state variabelen toevoegen voordat je de actions van Redux called.
     * Wanneer een functie dus geen variabelen nodig heeft hoef je geen helper te maken. en kun je direct this.props.function aanroepen
     */

    addReminder() {
        this.props.addReminder(this.state.text, this.state.dueDate);
    }

    deleteReminder(id) {
        this.props.deleteReminder(id)
    }

    /**
     * renderReminders
     * Dit is zeer handig want deze functie wordt in de top render gecalled door {this.renderReminders} en voegt daarmee een stuk html toe met eventuele data. Dit kan fungeren als een simpele component
     * @returns html
     */
    renderReminders() {
        const { reminders } = this.props;
        return (
            <ul className="list-group col-sm-4">
                {
                    reminders.map(reminder => {
                        if(reminder.today){
                            alert('JE MOET VANDAAG: ' + reminder.text);
                        }
                        return (
                            <li key={reminder.id} className="list-group-item">
                                <div className="list-item">
                                    <div>{reminder.text}</div>
                                    <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                                </div>
                                <div onClick={() => this.deleteReminder(reminder.id)} className="list-item delete-button">
                                    &#x2715;
                                </div>
                            </li>
                        )
                    })
                }

            </ul>
        )
    }


    render(){
        return(
            <div className='app'>
                <div className="title">
                    Reminder Pro
                </div>
                <div className="form-inline reminder-form">
                    <div className="form-group">
                        <input className="form-control"
                               placeholder="I have to..."
                               onChange={event => this.setState({text: event.target.value})}
                               onKeyPress={event => {event.key === 'Enter' ? this.addReminder(): null}}
                        />
                        <input className="form-control"
                               type="datetime-local"
                                onChange={event => this.setState({dueDate: event.target.value})}
                        />
                    </div>
                    <button type="button" className="btn btn-success" onClick={() => this.addReminder()}>
                        Add Reminder
                    </button>
                </div>
                { this.renderReminders() }
                <div className="btn btn-danger" onClick={() => this.props.clearReminders()}>
                    Clear Reminders
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    addReminder,
    deleteReminder,
    clearReminders
}

function mapStateToProps(state){
    return {
        reminders: state
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

/**
Het is allowed om connect( null, { addReminder })(App) te gebruiken en dan kun je in dit geval heel de functie mapDispatchToProps wegdoen
 */

