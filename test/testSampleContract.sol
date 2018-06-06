pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SampleContract.sol";

contract testSampleContract{
    SampleContract instance = SampleContract(DeployedAddresses.SampleContract());

    function testUpdate() public {
        instance.Update(9);
        uint expected = instance.Get();

        Assert.equal(9, expected, "Not equal!");
    }
}