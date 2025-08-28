# `@charliecat/uber-link`

A dependency to generate Uber Deeplinks for riders. 

For information about Uber Deeplinks, please refer to [developer.uber.com • Introduction to Deep Links](https://developer.uber.com/docs/riders/ride-requests/tutorials/deep-links/introduction)

## Example

```typescript
import UberLink from "@charliecat/uber-link"

let link = new UberLink({
    pickup: "my_location",
    drop: { latitude: 48.15820, longitude: 17.10601, addressLine1: "Bratislava hl. st." }
})

// or

let link2 = (new UberLink())
    .setPickup(37.775818, -122.418028, "UberHQ", "1455 Market St, San Francisco, CA 94103")
    .setDrop({ latitude: 37.802374, longitude: -122.405818, addressLine1: "Coit Tower", addressLine2: "1 Telegraph Hill Blvd, San Francisco, CA 94133" })
    .setProductId("a1111c8c-c720-46c3-8534-2fcdd730040d")
    .setLinkText("View team roster")
    .setPartnerDeeplink("partner://team/9383")
    .setClientId("your-client-id")

console.log(link.url)
// https://m.uber.com/looking?pickup=my_location&drop%5B0%5D=%7B%22latitude%22%3A48.1582%2C%22longitude%22%3A17.10601%2C%22addressLine1%22%3A%22Bratislava+hl.+st.%22%7D
console.log(link.deeplink)
// uber://riderequest?pickup=my_location&dropoff%5Blatitude%5D=48.1582&dropoff%5Blongitude%5D=17.10601&dropoff%5Bnickname%5D=Bratislava+hl.+st.&dropoff%5Bformatted_address%5D=undefined
```


## UberLink Documentation

### Constructor Overloads

#### `constructor(input?: Partial<UberLink>)`

Creates an `UberLink` instance from an object containing the link parameters.

**Parameters:**

* `input` (`Partial<UberLink>`): Object containing the ride request parameters.

**Example:**

```typescript
const uberLink = new UberLink({
  clientId: "my-client-id",
  pickup: {
    latitude: 37.775818,
    longitude: -122.418028,
    addressLine1: "UberHQ",
    addressLine2: "1455 Market St, San Francisco, CA 94103"
  },
  drop: {
    latitude: 37.802374,
    longitude: -122.405818,
    addressLine1: "Coit Tower",
    addressLine2: "1 Telegraph Hill Blvd, San Francisco, CA 94133"
  },
  product_id: "a1111c8c-c720-46c3-8534-2fcdd730040d"
});
```

#### `constructor()`

Creates a clean `UberLink` instance with no parameters set.

**Example:**

```typescript
const uberLink = new UberLink();
```


### Properties

#### `url: string` (getter)

Generates the **mobile web link** (`https://m.uber.com/looking`) with the current ride parameters.

**Returns:**

* `string`: Encoded Uber web link.

**Example:**

```typescript
const link = uberLink.url;
// "https://m.uber.com/looking?client_id=my-client-id&pickup=..."
```

#### `deeplink: string` (getter)

Generates the **Uber app deeplink** (`uber://riderequest`) with the current ride parameters.

**Returns:**

* `string`: Encoded Uber deeplink.

**Example:**

```typescript
const deep = uberLink.deeplink;
// "uber://riderequest?pickup[latitude]=...&dropoff[latitude]=..."
```


### Methods

#### `setPickup(location: UberLocation | "my_location"): this`

Sets the pickup location from a location object or `"my_location"`.

**Parameters:**

* `location` (`UberLocation | "my_location"`): Pickup location details or `"my_location"` for automatic pickup.

**Returns:**

* `UberLink`: The updated `UberLink` instance.

**Example:**

```typescript
uberLink.setPickup("my_location");
```


#### `setPickup(longitude: number, latitude: number, addressLine1: string, addressLine2: string): this`

Sets the pickup location using coordinates and address information.

**Parameters:**

* `longitude` (`number`): Longitude of the pickup location.
* `latitude` (`number`): Latitude of the pickup location.
* `addressLine1` (`string`): Nickname or short label (e.g., "UberHQ").
* `addressLine2` (`string`): Full formatted address.

**Returns:**

* `UberLink`: The updated `UberLink` instance.

**Example:**

```typescript
uberLink.setPickup(-122.418028, 37.775818, "UberHQ", "1455 Market St, San Francisco, CA 94103");
```


#### `setDrop(location: UberLocation): this`

Sets the dropoff location.

**Parameters:**

* `location` (`UberLocation`): Dropoff location details.

**Returns:**

* `UberLink`: The updated `UberLink` instance.

**Example:**

```typescript
uberLink.setDrop({
  latitude: 37.802374,
  longitude: -122.405818,
  addressLine1: "Coit Tower",
  addressLine2: "1 Telegraph Hill Blvd, San Francisco, CA 94133"
});
```


#### `setProductId(productId: string): this`

Sets the product ID for the ride (e.g., UberX, UberBlack).

**Parameters:**

* `productId` (`string`): The Uber product ID.

**Returns:**

* `UberLink`: The updated `UberLink` instance.

**Example:**

```typescript
uberLink.setProductId("a1111c8c-c720-46c3-8534-2fcdd730040d");
```


#### `setLinkText(text: string): this`

Sets the optional text label for the deeplink.

**Parameters:**

* `text` (`string`): The text to display.

**Returns:**

* `UberLink`: The updated `UberLink` instance.

**Example:**

```typescript
uberLink.setLinkText("View team roster");
```


#### `setPartnerDeeplink(deeplink: string): this`

Sets the partner deeplink for integration with external apps.

**Parameters:**

* `deeplink` (`string`): Custom partner deeplink.

**Returns:**

* `UberLink`: The updated `UberLink` instance.

**Example:**

```typescript
uberLink.setPartnerDeeplink("partner://team/9383");
```


#### `setClientId(clientId: string): this`

Sets the Uber client ID (used in the web link).

**Parameters:**

* `clientId` (`string`): Uber API client ID.

**Returns:**

* `UberLink`: The updated `UberLink` instance.

**Example:**

```typescript
uberLink.setClientId("my-client-id");
```


### Interfaces

#### `UberLocation`

Represents a geographic location with address metadata.

**Properties:**

* `latitude: number` — Latitude of the location.
* `longitude: number` — Longitude of the location.
* `addressLine1: string` — Nickname or short label (e.g., `"UberHQ"`).
* `addressLine2: string` — Full formatted address.

**Example:**

```typescript
const location: UberLocation = {
  latitude: 37.775818,
  longitude: -122.418028,
  addressLine1: "UberHQ",
  addressLine2: "1455 Market St, San Francisco, CA 94103"
};
```


