pragma solidity ^0.4.17;

contract SampleContract {
    uint private _value;
    function Update(uint value) external {
        _value = value;
    }

    function Get() external view returns (uint){
        return _value;
    }
}