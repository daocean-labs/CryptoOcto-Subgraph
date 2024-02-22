import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  Breed as BreedEvent,
  Cooldown as CooldownEvent,
  CryptoOcto,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  Transfer as TransferEvent,
} from "../generated/CryptoOcto/CryptoOcto";
import {
  ListingCreated as ListingCreatedEvent,
  ListingCancelled as ListingCancelledEvent,
  ListingUpdated as ListingUpdatedEvent,
  ListingPurchased as ListingPurchaseEvent,
} from "../generated/CryptoOctoMarketplace/CryptoOctoMarketplace";
import {
  Approval,
  ApprovalForAll,
  Breed,
  Cooldown,
  Listing,
  ListingCancel,
  ListingCreation,
  ListingPurchase,
  ListingUpdate,
  Octo,
  OctoProperty,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  Transfer,
} from "../generated/schema";
import { BigInt, ipfs, json, log } from "@graphprotocol/graph-ts";

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.approved = event.params.approved;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.operator = event.params.operator;
  entity.approved = event.params.approved;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleBreed(event: BreedEvent): void {
  let entity = new Breed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.tokenId = event.params.tokenId;
  entity.generation = event.params.generation;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleCooldown(event: CooldownEvent): void {
  let entity = new Cooldown(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.tokenId = event.params.tokenId;
  entity.newCooldown = event.params.newCooldown;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.previousAdminRole = event.params.previousAdminRole;
  entity.newAdminRole = event.params.newAdminRole;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let transfer = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  transfer.from = event.params.from;
  transfer.to = event.params.to;
  transfer.tokenId = event.params.tokenId;

  transfer.blockNumber = event.block.number;
  transfer.blockTimestamp = event.block.timestamp;
  transfer.transactionHash = event.transaction.hash;

  transfer.save();

  let contractAddress = CryptoOcto.bind(event.address);
  let cryptoOcto = Octo.load(event.params.tokenId.toString());

  const ipfsHash =
    "bafybeiethxy5iicqiz7yhfs5velij57f34slwp6vhv3eqowkeqal4qd67y";
  let tokenURI = "/" + event.params.tokenId.toString() + ".json";

  if (cryptoOcto == null) {
    cryptoOcto = new Octo(event.params.tokenId.toString());
    cryptoOcto.creator = event.params.to;
    cryptoOcto.tokenURI = contractAddress.tokenURI(event.params.tokenId);
  }

  cryptoOcto.newOwner = event.params.to;
  cryptoOcto.blockNumber = event.block.number;
  cryptoOcto.save();

  let property = OctoProperty.load(event.params.tokenId.toString());

  if (property == null) {
    property = new OctoProperty(event.params.tokenId.toString());
    let fullURI = ipfsHash + tokenURI;

    log.info("The fullURI is: {} ", [fullURI]);

    let ipfsData = ipfs.cat(fullURI);

    if (ipfsData) {
      let ipfsValues = json.fromBytes(ipfsData);

      let ipfsValuesObject = ipfsValues.toObject();

      if (ipfsValuesObject) {
        const rarity = ipfsValuesObject.get("rarity");
        const image = ipfsValuesObject.get("image");

        if (rarity) {
          property.rarity = rarity.toBigInt();
        }
        if (image) {
          property.image = image.toString();
        }

        property.save();
      }
    }
  }

  // Check if a active listing and set the purchase price to zero

  let listing = Listing.load(event.params.tokenId.toString());
  if (listing != null) {
    listing.price = new BigInt(0);
    listing.blockNumber = event.block.number;

    listing.save();
  }
}

export function handleListingCreated(event: ListingCreatedEvent): void {
  let listingCreation = new ListingCreation(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  listingCreation.seller = event.params.seller;
  listingCreation.price = event.params.price;
  listingCreation.paymentToken = event.params.paymentToken;
  listingCreation.tokenId = event.params.tokenId;

  listingCreation.blockNumber = event.block.number;
  listingCreation.blockTimestamp = event.block.timestamp;
  listingCreation.transactionHash = event.transaction.hash;

  listingCreation.save();

  let listing = Listing.load(event.params.tokenId.toString());

  if (listing == null) {
    listing = new Listing(event.params.tokenId.toString());
  }

  listing.seller = event.params.seller;
  listing.paymentToken = event.params.paymentToken;
  listing.price = event.params.price;
  listing.blockNumber = event.block.number;

  listing.save();
}

export function handleListingCancelled(event: ListingCancelledEvent): void {
  let listingCancelling = new ListingCancel(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  listingCancelling.seller = event.params.seller;
  listingCancelling.tokenId = event.params.tokenId;

  listingCancelling.blockNumber = event.block.number;
  listingCancelling.blockTimestamp = event.block.timestamp;
  listingCancelling.transactionHash = event.transaction.hash;

  listingCancelling.save();

  let listing = Listing.load(event.params.tokenId.toString());

  if (listing != null) {
    listing.price = new BigInt(0);
    listing.blockNumber = event.block.number;

    listing.save();
  }
}

export function handleListingUpdated(event: ListingUpdatedEvent): void {
  let listingUpdate = new ListingUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  listingUpdate.seller = event.params.seller;
  listingUpdate.tokenId = event.params.tokenId;
  listingUpdate.price = event.params.newPrice;

  listingUpdate.blockNumber = event.block.number;
  listingUpdate.blockTimestamp = event.block.timestamp;
  listingUpdate.transactionHash = event.transaction.hash;

  listingUpdate.save();

  let listing = Listing.load(event.params.tokenId.toString());

  if (listing != null) {
    listing.price = event.params.newPrice;
    listing.blockNumber = event.block.number;

    listing.save();
  }
}

export function hadnleListingPurchased(event: ListingPurchaseEvent): void {
  let listingPurchase = new ListingPurchase(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  listingPurchase.seller = event.params.seller;
  listingPurchase.tokenId = event.params.tokenId;
  listingPurchase.buyer = event.params.buyer;
  listingPurchase.paymentToken = event.params.paymentToken;

  listingPurchase.blockNumber = event.block.number;
  listingPurchase.blockTimestamp = event.block.timestamp;
  listingPurchase.transactionHash = event.transaction.hash;

  listingPurchase.save();

  let listing = Listing.load(event.params.tokenId.toString());

  if (listing != null) {
    listing.price = new BigInt(0);
    listing.blockNumber = event.block.number;

    listing.save();
  }
}
