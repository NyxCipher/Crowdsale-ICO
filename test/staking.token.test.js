const Token = artifacts.require("MyToken");
const chai = require("./chaisetup.js");
const BN = web3.utils.BN;
const BigNumber = require('bignumber.js');
const expect = chai.expect;

//const {BN, pow, multipliedBy, Constants, expectEvent, expectRevert} = require('@openzeppelin/test-helpers');
require('dotenv').config({path: '../.env'});

contract("StakingToken", (accounts) => {

	let statkingToken;
	const manyTokens = BigNumber(process.env.INITIAL_TOKENS);
	const owner = accounts[0];
	const user = accounts[1];

	before(async () => {
		stakingToken = await Token.deployed();
		stakingToken = await Token.new(process.env.INITIAL_TOKENS);
	});

	describe('Staking', () => {
		beforeEach(async () => {
			stakingToken = await Token.new(
				owner,
				//manyTokens.toString(10)
				);
		});
	});
	it('createStake creates a stake.', async () => {
        await stakingToken.transfer(user, 3, { from: owner });
        await stakingToken.createStake(1, { from: user });

		assert.equal(await stakingToken.balanceOf(user), 2);
        assert.equal(await stakingToken.stakeOf(user), 1);
        assert.equal(
               await stakingToken.totalSupply(), 
               manyTokens.minus(1).toString(10),
           );
        assert.equal(await stakingToken.totalStakes(), 1);
	});
	it('rewards are distributed.', async () => {
           await stakingToken.transfer(user, 100, { from: owner });
           await stakingToken.createStake(100, { from: user });
           await stakingToken.distributeRewards({ from: owner });
          
           assert.equal(await stakingToken.rewardOf(user), 1);
           assert.equal(await stakingToken.totalRewards(), 1);
       });
	it('rewards can be withdrawn.', async () => {
           await stakingToken.transfer(user, 100, { from: owner });
           await stakingToken.createStake(100, { from: user });
           await stakingToken.distributeRewards({ from: owner });
           await stakingToken.withdrawReward({ from: user });
          
           const initialSupply = manyTokens;
           const existingStakes = 100;
           const mintedAndWithdrawn = 1;

           assert.equal(await stakingToken.balanceOf(user), 1);
           assert.equal(await stakingToken.stakeOf(user), 100);
           assert.equal(await stakingToken.rewardOf(user), 0);
           assert.equal(
               await stakingToken.totalSupply(),
               initialSupply
                   .minus(existingStakes)
                   .plus(mintedAndWithdrawn)
                   .toString(10)
               );
           assert.equal(await stakingToken.totalStakes(), 100);
           assert.equal(await stakingToken.totalRewards(), 0);
       });

});