import Raiden from '../src';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { AjaxCreationMethod } from 'rxjs/internal/observable/dom/AjaxObservable';
import Http from 'http-status-codes';

jest.mock('rxjs/ajax');

describe('raiden node', () => {
  it('should return our address as a string', async (done) => {
    const ourAddress = '0xeD7f5B7249b88A17425478D2c114972EA960Fd2A';
    const ajaxMock = (ajax as unknown) as jest.Mock<AjaxCreationMethod>;
    ajaxMock.mockReturnValue(of({
      response: { our_address: ourAddress },
      status: Http.OK,
    }) as any);

    const raiden = Raiden.create();

    const addr = await raiden.node.ourAddress().toPromise();
    expect(addr).toEqual(ourAddress);
    done();
  });
});
