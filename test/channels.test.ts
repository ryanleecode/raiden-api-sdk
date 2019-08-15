import Raiden, { Channel, ChannelState } from '../src';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { AjaxCreationMethod } from 'rxjs/internal/observable/dom/AjaxObservable';
import Http from 'http-status-codes';
import { Channels } from '../src/channels';
import { InlineObjectStateEnum } from 'raiden-openapi-sdk';

jest.mock('rxjs/ajax');

describe('channels', () => {
  const tokenAddress = '0xaFF4481D10270F50f203E0763e2597776068CBc5';
  const partnerAddressA = '0x26704469E95202191bf3Fb277669B6E6Bdd8cC65';
  const mockChannels = [
    {
      settle_timeout: 500,
      balance: 0,
      partner_address: partnerAddressA,
      reveal_timeout: 50,
      state: 'opened' as ChannelState,
      total_deposit: 0,
      token_address: tokenAddress,
      channel_identifier: 2,
      token_network_identifier: '0x26746540aBB01b15294Bf93715e4EEdAF1946110',
    },
    {
      settle_timeout: 500,
      balance: 6000000000000000000,
      partner_address: '0xEfd578c8B83E2d68c613637CE1255B033F1DA9b9',
      reveal_timeout: 50,
      state: 'opened' as ChannelState,
      total_deposit: 6000000000000000000,
      token_address: tokenAddress,
      channel_identifier: 3,
      token_network_identifier: '0x26746540aBB01b15294Bf93715e4EEdAF1946110',
    },
  ];

  function mapChannel(ch: typeof mockChannels[0]): Channel {
    return {
      tokenNetworkIdentifier: ch.token_network_identifier,
      channelIdentifier: ch.channel_identifier,
      partnerAddress: ch.partner_address,
      tokenAddress: ch.token_address,
      balance: ch.balance,
      totalDeposit: ch.total_deposit,
      state: ch.state,
      settleTimeout: ch.settle_timeout,
      revealTimeout: ch.reveal_timeout,
    };
  }

  describe('find all unsettled', () => {
    it('should map snakecase to camelcase and vice-versa', async (done) => {
      const ajaxMock = (ajax as unknown) as jest.Mock<AjaxCreationMethod>;
      ajaxMock.mockReturnValueOnce(of({
        response: mockChannels,
        status: Http.OK,
      }) as any);

      const raiden = Raiden.create();

      const channels = await raiden.channels.findAllUnsettled().toPromise();
      expect(channels).toEqual(mockChannels.map(mapChannel));

      done();
    });

    it('should call getChannels', async (done) => {
      const getChannels = jest.fn(() => of());
      const mockChannelsApi = jest.fn<any, []>(() => ({
        getChannels,
      }));
      const channels = new Channels(new mockChannelsApi());
      await channels.findAllUnsettled().toPromise();
      expect(getChannels).toBeCalledTimes(1);
      done();
    });
  });

  describe('find all unsettled for', () => {
    it('should map snakecase to camelcase and vice-versa', async (done) => {
      const ajaxMock = (ajax as unknown) as jest.Mock<AjaxCreationMethod>;
      ajaxMock.mockReturnValueOnce(of({
        response: mockChannels,
        status: Http.OK,
      }) as any);

      const raiden = Raiden.create();

      const channels = await raiden.channels
        .findAllUnsettledFor(tokenAddress)
        .toPromise();
      expect(channels).toEqual(mockChannels.map(mapChannel));

      done();
    });

    it('should call getChannelsForToken', async (done) => {
      const getChannelsForToken = jest.fn(() => of());
      const mockChannelsApi = jest.fn<any, []>(() => ({
        getChannelsForToken,
      }));
      const channels = new Channels(new mockChannelsApi());
      await channels.findAllUnsettledFor(tokenAddress).toPromise();
      expect(getChannelsForToken).toBeCalledWith({ tokenAddress });
      done();
    });
  });

  describe('inspect channel', () => {
    it('should map snakecase to camelcase and vice-versa', async (done) => {
      const ajaxMock = (ajax as unknown) as jest.Mock<AjaxCreationMethod>;
      ajaxMock.mockReturnValueOnce(of({
        response: mockChannels[0],
        status: Http.OK,
      }) as any);

      const raiden = Raiden.create();

      const channel = await raiden.channels
        .inspect(tokenAddress, partnerAddressA)
        .toPromise();
      expect(channel).toEqual(mapChannel(mockChannels[0]));

      done();
    });

    it('should call getPartnerChannel', async (done) => {
      const getPartnerChannel = jest.fn(() => of());
      const mockChannelsApi = jest.fn<any, []>(() => ({
        getPartnerChannel,
      }));
      const channels = new Channels(new mockChannelsApi());
      await channels.inspect(tokenAddress, partnerAddressA).toPromise();
      expect(getPartnerChannel).toBeCalledWith({
        tokenAddress,
        partnerAddress: partnerAddressA,
      });
      done();
    });
  });

  describe('open channel', () => {
    const params = {
      partnerAddress: partnerAddressA,
      tokenAddress,
      totalDeposit: 6 * Math.pow(10, 18),
      settleTimeout: 500,
    };

    it('should map snakecase to camelcase and vice-versa', async (done) => {
      const ajaxMock = (ajax as unknown) as jest.Mock<AjaxCreationMethod>;
      ajaxMock.mockReturnValueOnce(of({
        response: mockChannels[0],
        status: Http.OK,
      }) as any);

      const raiden = Raiden.create();

      const channel = await raiden.channels.open(params).toPromise();
      expect(channel).toEqual(mapChannel(mockChannels[0]));

      done();
    });

    it('should call openChannel', async (done) => {
      const openChannel = jest.fn(() => of());
      const mockChannelsApi = jest.fn<any, []>(() => ({
        openChannel,
      }));
      const channels = new Channels(new mockChannelsApi());
      await channels.open(params).toPromise();
      expect(openChannel).toBeCalledWith({ channelPartial: params });
      done();
    });
  });

  describe('close channel', () => {
    const openChannel: Channel = {
      partnerAddress: partnerAddressA,
      tokenAddress,
      totalDeposit: mockChannels[0].total_deposit,
      settleTimeout: mockChannels[0].settle_timeout,
      channelIdentifier: mockChannels[0].channel_identifier,
      tokenNetworkIdentifier: mockChannels[0].token_network_identifier,
      balance: mockChannels[0].balance,
      state: mockChannels[0].state,
      revealTimeout: mockChannels[0].reveal_timeout,
    };

    it('should map snakecase to camelcase and vice-versa', async (done) => {
      const mockChannel = { ...mockChannels[0], state: ChannelState.Closed };
      const ajaxMock = (ajax as unknown) as jest.Mock<AjaxCreationMethod>;
      ajaxMock.mockReturnValueOnce(of({
        response: mockChannel,
        status: Http.OK,
      }) as any);

      const raiden = Raiden.create();

      const channel = await raiden.channels.close(openChannel).toPromise();
      expect(channel).toEqual(mapChannel(mockChannel));

      done();
    });

    it('should call close channel variant of patchChannel', async (done) => {
      const patchChannel = jest.fn(() => of());
      const mockChannelsApi = jest.fn<any, []>(() => ({
        patchChannel,
      }));
      const channels = new Channels(new mockChannelsApi());
      await channels.close(openChannel).toPromise();
      expect(patchChannel).toBeCalledWith({
        tokenAddress: openChannel.tokenAddress,
        partnerAddress: openChannel.partnerAddress,
        inlineObject: { state: InlineObjectStateEnum.Closed },
      });
      done();
    });
  });

  describe('deposit into channel', () => {
    const openChannel: Channel = {
      partnerAddress: partnerAddressA,
      tokenAddress,
      totalDeposit: mockChannels[0].total_deposit,
      settleTimeout: mockChannels[0].settle_timeout,
      channelIdentifier: mockChannels[0].channel_identifier,
      tokenNetworkIdentifier: mockChannels[0].token_network_identifier,
      balance: mockChannels[0].balance,
      state: mockChannels[0].state,
      revealTimeout: mockChannels[0].reveal_timeout,
    };
    const amount = 2 * Math.pow(10, 18);

    it('should map snakecase to camelcase and vice-versa', async (done) => {
      const mockChannel = { ...mockChannels[0], state: ChannelState.Closed };
      const ajaxMock = (ajax as unknown) as jest.Mock<AjaxCreationMethod>;
      ajaxMock.mockReturnValueOnce(of({
        response: mockChannel,
        status: Http.OK,
      }) as any);

      const raiden = Raiden.create();

      const channel = await raiden.channels
        .deposit(amount, openChannel)
        .toPromise();
      expect(channel).toEqual(mapChannel(mockChannel));

      done();
    });

    it('should call close deposit variant of patchChannel', async (done) => {
      const patchChannel = jest.fn(() => of());
      const mockChannelsApi = jest.fn<any, []>(() => ({
        patchChannel,
      }));
      const channels = new Channels(new mockChannelsApi());
      await channels.deposit(amount, openChannel).toPromise();
      expect(patchChannel).toBeCalledWith({
        tokenAddress: openChannel.tokenAddress,
        partnerAddress: openChannel.partnerAddress,
        inlineObject: { totalDeposit: openChannel.balance + amount },
      });
      done();
    });
  });
});
