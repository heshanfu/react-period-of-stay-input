import * as React from 'react'
import DatePicker from 'react-datepicker'
import { FormattedMessage } from 'react-intl'
import { Moment } from 'moment'
import Locale from './Locale'
import momentLocale from './momentLocale'
import { FORMAT } from './Day'
import Model from './Model'
import Environment from './Environment'

function CalendarIcon() {
    return (
        <i className='fa fa-calendar calendar-icon' />
    )
}

export default class PeriodOfStayInput extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
        this.handleCheckInChange = this.handleCheckInChange.bind(this)
        this.handleCheckOutChange = this.handleCheckOutChange.bind(this)
        this.handleNativeCheckInChange = this.handleNativeCheckInChange.bind(this)
        this.handleNativeCheckOutChange = this.handleNativeCheckOutChange.bind(this)
    }

    render() {
        const className = 'period-of-stay-input' + (
            this.props.className ? ` ${this.props.className}` : ''
        )

        const locale = momentLocale(this.props.locale)
        const mCheckIn = this.props.model.checkInDate.toMoment()
        const mCheckOut = this.props.model.checkOutDate.toMoment()

        return (
            <div {...{ className }}>
                <div className='period-of-stay-check-in'>
                    <label>
                        <FormattedMessage id='react-period-of-stay-input.checkInDay' />
                    </label>

                    <DatePicker
                        locale={locale}
                        selected={mCheckIn}
                        selectsStart
                        startDate={mCheckIn}
                        endDate={mCheckOut}
                        onChange={this.handleCheckInChange} />

                    <CalendarIcon />
                </div>

                <div className='period-of-stay-check-out'>
                    <label>
                        <FormattedMessage id='react-period-of-stay-input.checkOutDay' />
                    </label>

                    <DatePicker
                        locale={locale}
                        selected={mCheckOut}
                        selectsEnd
                        startDate={mCheckIn}
                        endDate={mCheckOut}
                        onChange={this.handleCheckOutChange} />

                    <CalendarIcon />
                </div>

                <span className='period-of-stay-nights'>
                    <FormattedMessage
                        id='react-period-of-stay-input.period'
                        values={{ count: this.props.model.nightsCount() }} />
                </span>
            </div>
        )
    }

    handleCheckInChange(newValue: Moment): void {
        this.props.onChange(
            this.props.model.newCheckIn(newValue.format(FORMAT), this.props.environment)
        )
    }

    handleCheckOutChange(newValue: Moment): void {
        this.props.onChange(
            this.props.model.newCheckOut(newValue.format(FORMAT), this.props.environment)
        )
    }

    handleNativeCheckInChange(ev: InputChangeEvent): void {
        this.props.onChange(
            this.props.model.newCheckIn(ev.target.value, this.props.environment)
        )
    }

    handleNativeCheckOutChange(ev: InputChangeEvent): void {
        this.props.onChange(
            this.props.model.newCheckOut(ev.target.value, this.props.environment)
        )
    }
}

export interface Props {
    className?: string,
    locale: Locale,
    model: Model,
    environment: Environment,
    onChange: (newValue: Model) => void
}

interface InputChangeEvent {
    target: { value: string }
}
