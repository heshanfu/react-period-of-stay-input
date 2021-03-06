import * as assert from 'assert'
import * as moment from 'moment'
import Day, { FORMAT } from '../src/Day'

describe('Day', () => {
    it('stores the vlue assigned on construction', () => {
        const d = new Day('2018-07-26')
        assert.strictEqual(d.toString(), '2018-07-26')
    })

    it('throws on a date literal without separatorts', () => {
        assert.throws(() => { new Day('20180231') }, /valid/i)
    })

    it('throws when a 31st of February is passed in', () => {
        assert.throws(() => { new Day('2018-02-31') }, /valid/i)
    })

    it('provides a convertor to `moment` instance', () => {
        const d = new Day('2017-11-17')
        assert(moment.isMoment(d.toMoment()))
        assert.strictEqual(d.toMoment().format(FORMAT), '2017-11-17')
    })

    it('has the next day provider method', () => {
        const d = new Day('2017-11-17')
        assert.strictEqual(d.next().toString(), '2017-11-18')
    })

    it('has the previous day provider method', () => {
        const d = new Day('2017-11-17')
        assert.strictEqual(d.previous().toString(), '2017-11-16')
    })

    it('can be constructed from a moment instance', () => {
        assert.deepStrictEqual(new Day('2018-08-03'), new Day(moment.utc('2018-08-03')))
    })
})
