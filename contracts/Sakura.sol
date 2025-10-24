// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Sakura (SKR)
 * @dev Simple ERC-20 with owner-gated mint and open burn.
 */
contract Sakura is ERC20, Ownable {
    /// @notice Semantic version string for quick identification.
    string public constant VERSION = "1.1.0";

    /// @notice Emitted when tokens are minted by the owner.
    event Minted(address indexed to, uint256 amount);
    /// @notice Emitted when tokens are burned by a holder.
    event Burned(address indexed from, uint256 amount);

    /**
     * @param initialOwner Owner address (receives Ownable ownership).
     * @param initialSupply Initial mint in wei (e.g., 1_000_000e18).
     */
    constructor(address initialOwner, uint256 initialSupply)
        ERC20("Sakura", "SKR")
        Ownable(initialOwner)
    {
        if (initialOwner == address(0)) revert("OwnerZeroAddress");
        if (initialSupply > 0) {
            _mint(initialOwner, initialSupply);
            emit Minted(initialOwner, initialSupply);
        }
    }

    /**
     * @notice Owner can mint new tokens to `to`.
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
        emit Minted(to, amount);
    }

    /**
     * @notice Any holder can burn their own tokens.
     */
    function burn(uint256 amount) external {
        _burn(_msgSender(), amount);
        emit Burned(_msgSender(), amount);
    }
}
