
import getQuery from './getQuery';
describe('getQuery tests', () => {
    test('get topic from filter', () => {
        const filter = { topic: 'Travel', otherTopic: ''}
        expect(getQuery(filter)).toBe('Travel');
    });

    test('get other topic from filter', () => {
        const filter = { topic: 'other', otherTopic: 'Some other topic'}
        expect(getQuery(filter)).toBe('Some other topic');
    });
});