// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt,
} from "@graphprotocol/graph-ts";

export class FeeSet extends ethereum.Event {
  get params(): FeeSet__Params {
    return new FeeSet__Params(this);
  }
}

export class FeeSet__Params {
  _event: FeeSet;

  constructor(event: FeeSet) {
    this._event = event;
  }

  get newFee(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class ListingCancelled extends ethereum.Event {
  get params(): ListingCancelled__Params {
    return new ListingCancelled__Params(this);
  }
}

export class ListingCancelled__Params {
  _event: ListingCancelled;

  constructor(event: ListingCancelled) {
    this._event = event;
  }

  get seller(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class ListingCreated extends ethereum.Event {
  get params(): ListingCreated__Params {
    return new ListingCreated__Params(this);
  }
}

export class ListingCreated__Params {
  _event: ListingCreated;

  constructor(event: ListingCreated) {
    this._event = event;
  }

  get seller(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get price(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get paymentToken(): Address {
    return this._event.parameters[3].value.toAddress();
  }
}

export class ListingPurchased extends ethereum.Event {
  get params(): ListingPurchased__Params {
    return new ListingPurchased__Params(this);
  }
}

export class ListingPurchased__Params {
  _event: ListingPurchased;

  constructor(event: ListingPurchased) {
    this._event = event;
  }

  get buyer(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get seller(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get paymentToken(): Address {
    return this._event.parameters[3].value.toAddress();
  }
}

export class ListingUpdated extends ethereum.Event {
  get params(): ListingUpdated__Params {
    return new ListingUpdated__Params(this);
  }
}

export class ListingUpdated__Params {
  _event: ListingUpdated;

  constructor(event: ListingUpdated) {
    this._event = event;
  }

  get seller(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get newPrice(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class NewPaymentToken extends ethereum.Event {
  get params(): NewPaymentToken__Params {
    return new NewPaymentToken__Params(this);
  }
}

export class NewPaymentToken__Params {
  _event: NewPaymentToken;

  constructor(event: NewPaymentToken) {
    this._event = event;
  }

  get token(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Withdrawal extends ethereum.Event {
  get params(): Withdrawal__Params {
    return new Withdrawal__Params(this);
  }
}

export class Withdrawal__Params {
  _event: Withdrawal;

  constructor(event: Withdrawal) {
    this._event = event;
  }

  get to(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class CryptoOctoMarketplace__getListingResultValue0Struct extends ethereum.Tuple {
  get price(): BigInt {
    return this[0].toBigInt();
  }

  get seller(): Address {
    return this[1].toAddress();
  }

  get paymentToken(): Address {
    return this[2].toAddress();
  }
}

export class CryptoOctoMarketplace extends ethereum.SmartContract {
  static bind(address: Address): CryptoOctoMarketplace {
    return new CryptoOctoMarketplace("CryptoOctoMarketplace", address);
  }

  FEE_MULTIPLIER(): BigInt {
    let result = super.call("FEE_MULTIPLIER", "FEE_MULTIPLIER():(uint256)", []);

    return result[0].toBigInt();
  }

  try_FEE_MULTIPLIER(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "FEE_MULTIPLIER",
      "FEE_MULTIPLIER():(uint256)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  MAX_FEE(): BigInt {
    let result = super.call("MAX_FEE", "MAX_FEE():(uint256)", []);

    return result[0].toBigInt();
  }

  try_MAX_FEE(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("MAX_FEE", "MAX_FEE():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getFee(): BigInt {
    let result = super.call("getFee", "getFee():(uint256)", []);

    return result[0].toBigInt();
  }

  try_getFee(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("getFee", "getFee():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getListing(
    tokenId: BigInt,
  ): CryptoOctoMarketplace__getListingResultValue0Struct {
    let result = super.call(
      "getListing",
      "getListing(uint256):((uint256,address,address))",
      [ethereum.Value.fromUnsignedBigInt(tokenId)],
    );

    return changetype<CryptoOctoMarketplace__getListingResultValue0Struct>(
      result[0].toTuple(),
    );
  }

  try_getListing(
    tokenId: BigInt,
  ): ethereum.CallResult<CryptoOctoMarketplace__getListingResultValue0Struct> {
    let result = super.tryCall(
      "getListing",
      "getListing(uint256):((uint256,address,address))",
      [ethereum.Value.fromUnsignedBigInt(tokenId)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<CryptoOctoMarketplace__getListingResultValue0Struct>(
        value[0].toTuple(),
      ),
    );
  }

  getOctoAddress(): Address {
    let result = super.call("getOctoAddress", "getOctoAddress():(address)", []);

    return result[0].toAddress();
  }

  try_getOctoAddress(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getOctoAddress",
      "getOctoAddress():(address)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  isPaymentToken(token: Address): boolean {
    let result = super.call(
      "isPaymentToken",
      "isPaymentToken(address):(bool)",
      [ethereum.Value.fromAddress(token)],
    );

    return result[0].toBoolean();
  }

  try_isPaymentToken(token: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isPaymentToken",
      "isPaymentToken(address):(bool)",
      [ethereum.Value.fromAddress(token)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get cryptoOcto(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get fee(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get paymentTokens(): Array<Address> {
    return this._call.inputValues[2].value.toAddressArray();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AddPaymentTokenCall extends ethereum.Call {
  get inputs(): AddPaymentTokenCall__Inputs {
    return new AddPaymentTokenCall__Inputs(this);
  }

  get outputs(): AddPaymentTokenCall__Outputs {
    return new AddPaymentTokenCall__Outputs(this);
  }
}

export class AddPaymentTokenCall__Inputs {
  _call: AddPaymentTokenCall;

  constructor(call: AddPaymentTokenCall) {
    this._call = call;
  }

  get token(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class AddPaymentTokenCall__Outputs {
  _call: AddPaymentTokenCall;

  constructor(call: AddPaymentTokenCall) {
    this._call = call;
  }
}

export class CancelListingCall extends ethereum.Call {
  get inputs(): CancelListingCall__Inputs {
    return new CancelListingCall__Inputs(this);
  }

  get outputs(): CancelListingCall__Outputs {
    return new CancelListingCall__Outputs(this);
  }
}

export class CancelListingCall__Inputs {
  _call: CancelListingCall;

  constructor(call: CancelListingCall) {
    this._call = call;
  }

  get tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class CancelListingCall__Outputs {
  _call: CancelListingCall;

  constructor(call: CancelListingCall) {
    this._call = call;
  }
}

export class CreateListingCall extends ethereum.Call {
  get inputs(): CreateListingCall__Inputs {
    return new CreateListingCall__Inputs(this);
  }

  get outputs(): CreateListingCall__Outputs {
    return new CreateListingCall__Outputs(this);
  }
}

export class CreateListingCall__Inputs {
  _call: CreateListingCall;

  constructor(call: CreateListingCall) {
    this._call = call;
  }

  get tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get price(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class CreateListingCall__Outputs {
  _call: CreateListingCall;

  constructor(call: CreateListingCall) {
    this._call = call;
  }
}

export class CreateListingWithTokenCall extends ethereum.Call {
  get inputs(): CreateListingWithTokenCall__Inputs {
    return new CreateListingWithTokenCall__Inputs(this);
  }

  get outputs(): CreateListingWithTokenCall__Outputs {
    return new CreateListingWithTokenCall__Outputs(this);
  }
}

export class CreateListingWithTokenCall__Inputs {
  _call: CreateListingWithTokenCall;

  constructor(call: CreateListingWithTokenCall) {
    this._call = call;
  }

  get tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get price(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get paymentToken(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class CreateListingWithTokenCall__Outputs {
  _call: CreateListingWithTokenCall;

  constructor(call: CreateListingWithTokenCall) {
    this._call = call;
  }
}

export class PurchaseListingCall extends ethereum.Call {
  get inputs(): PurchaseListingCall__Inputs {
    return new PurchaseListingCall__Inputs(this);
  }

  get outputs(): PurchaseListingCall__Outputs {
    return new PurchaseListingCall__Outputs(this);
  }
}

export class PurchaseListingCall__Inputs {
  _call: PurchaseListingCall;

  constructor(call: PurchaseListingCall) {
    this._call = call;
  }

  get tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class PurchaseListingCall__Outputs {
  _call: PurchaseListingCall;

  constructor(call: PurchaseListingCall) {
    this._call = call;
  }
}

export class PurchaseListingWithTokenCall extends ethereum.Call {
  get inputs(): PurchaseListingWithTokenCall__Inputs {
    return new PurchaseListingWithTokenCall__Inputs(this);
  }

  get outputs(): PurchaseListingWithTokenCall__Outputs {
    return new PurchaseListingWithTokenCall__Outputs(this);
  }
}

export class PurchaseListingWithTokenCall__Inputs {
  _call: PurchaseListingWithTokenCall;

  constructor(call: PurchaseListingWithTokenCall) {
    this._call = call;
  }

  get tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class PurchaseListingWithTokenCall__Outputs {
  _call: PurchaseListingWithTokenCall;

  constructor(call: PurchaseListingWithTokenCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SetFeeCall extends ethereum.Call {
  get inputs(): SetFeeCall__Inputs {
    return new SetFeeCall__Inputs(this);
  }

  get outputs(): SetFeeCall__Outputs {
    return new SetFeeCall__Outputs(this);
  }
}

export class SetFeeCall__Inputs {
  _call: SetFeeCall;

  constructor(call: SetFeeCall) {
    this._call = call;
  }

  get newFee(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetFeeCall__Outputs {
  _call: SetFeeCall;

  constructor(call: SetFeeCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class UpdateListingCall extends ethereum.Call {
  get inputs(): UpdateListingCall__Inputs {
    return new UpdateListingCall__Inputs(this);
  }

  get outputs(): UpdateListingCall__Outputs {
    return new UpdateListingCall__Outputs(this);
  }
}

export class UpdateListingCall__Inputs {
  _call: UpdateListingCall;

  constructor(call: UpdateListingCall) {
    this._call = call;
  }

  get tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get newPrice(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class UpdateListingCall__Outputs {
  _call: UpdateListingCall;

  constructor(call: UpdateListingCall) {
    this._call = call;
  }
}

export class WithdrawCall extends ethereum.Call {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }

  get token(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}