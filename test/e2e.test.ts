import Raiden, { Configuration } from '../src';

describe('E2E API Test', () => {
  let raidenNode1: Raiden;
  let raidenNode2: Raiden;
  beforeAll(() => {
    require('dotenv').config();

    raidenNode1 = Raiden.create(
      new Configuration({ basePath: process.env.NODE1_BASE_PATH }),
    );
    raidenNode2 = Raiden.create(
      new Configuration({ basePath: process.env.NODE2_BASE_PATH }),
    );
  });

  let nodeAddr1: string;
  let nodeAddr2: string;
  it('should be able to get node addresses', async (done) => {
    nodeAddr1 = await raidenNode1.node.ourAddress().toPromise();
    nodeAddr2 = await raidenNode2.node.ourAddress().toPromise();
    expect(nodeAddr1).toMatch(/^0x[a-fA-F0-9]{40}$/);
    expect(nodeAddr2).toMatch(/^0x[a-fA-F0-9]{40}$/);
    expect(nodeAddr1).not.toEqual(nodeAddr2);
    done();
  });
});
