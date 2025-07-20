import UberLink from ".";

let link = (new UberLink()).setPickup(37.775818, -122.418028, "UberHQ", "1455 Market St, San Francisco, CA 94103")
	.setDrop({ latitude: 37.802374, longitude: -122.405818, addressLine1: "Coit Tower", addressLine2: "1 Telegraph Hill Blvd, San Francisco, CA 94133" })
	.setProductId("a1111c8c-c720-46c3-8534-2fcdd730040d")
	.setLinkText("View team roster")
	.setPartnerDeeplink("partner://team/9383")
	.setClientId("your-client-id")
	.url

console.log(link);