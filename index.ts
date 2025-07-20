export default class UberLink {
	// uber://riderequest
	// ?pickup[latitude]=37.775818
	// &pickup[longitude]=-122.418028
	// &pickup[nickname]=UberHQ
	// &pickup[formatted_address]=1455%20Market%20St%2C%20San%20Francisco%2C%20CA%2094103
	// &dropoff[latitude]=37.802374
	// &dropoff[longitude]=-122.405818
	// &dropoff[nickname]=Coit%20Tower
	// &dropoff[formatted_address]=1%20Telegraph%20Hill%20Blvd%2C%20San%20Francisco%2C%20CA%2094133
	// &product_id=a1111c8c-c720-46c3-8534-2fcdd730040d
	// &link_text=View%20team%20roster
	// &partner_deeplink=partner%3A%2F%2Fteam%2F9383

	// https://m.uber.com/looking
	// ?client_id=<CLIENT_ID>
	// &pickup=%7B%22latitude%22%3A37.77581%2C%22longitude%22%3A-122.418028%2C%22addressLine1%22%3A%22UberHQ%22%2C%22addressLine2%22%3A%221455%20Market%20St%2C%20San%20Francisco%2C%20CA%2094103%22%7D
	// &drop[0]=%7B%22latitude%22%3A37.802374%2C%22longitude%22%3A-122.405818%2C%22addressLine1%22%3A%22Coit%20Tower%22%2C%22addressLine2%22%3A%221%20Telegraph%20Hill%20Blvd%2C%20San%20Francisco%2C%20CA%2094133%22%7D
	// &product_id=a1111c8c-c720-46c3-8534-2fcdd730040d

	clientId?: string;
	pickup?: UberLocation | "my_location";
	drop?: UberLocation;
	product_id?: string;
	link_text?: string;
	partner_deeplink?: string;

	constructor({ pickup, drop, product_id, link_text, partner_deeplink, clientId }: Partial<UberLink> = {}) {
		this.pickup = pickup;
		this.drop = drop;
		this.product_id = product_id;
		this.link_text = link_text;
		this.partner_deeplink = partner_deeplink;
		this.clientId = clientId;
	}

	get url(): string {
		const baseUrl = "https://m.uber.com/looking";
		const params: URLSearchParams = new URLSearchParams();

		if (this.pickup) {
			if (this.pickup === "my_location") {
				params.set("pickup", "my_location");
			} else {
				params.set("pickup", JSON.stringify(this.pickup));
			}
		}
		if (this.drop) params.set("drop[0]", JSON.stringify(this.drop));
		if (this.product_id) params.set("product_id", this.product_id);
		if (this.clientId) params.set("client_id", this.clientId);

		return `${baseUrl}?${params.toString()}`;
	}

	get deeplink(): string {
		const baseDeeplink = "uber://riderequest";
		const params: URLSearchParams = new URLSearchParams();

		if (this.pickup) {
			if (this.pickup === "my_location") {
				params.set("pickup", "my_location");
			} else {
				params.set("pickup[latitude]", this.pickup.latitude.toString());
				params.set("pickup[longitude]", this.pickup.longitude.toString());
				params.set("pickup[nickname]", this.pickup.addressLine1);
				params.set("pickup[formatted_address]", this.pickup.addressLine2);
			}
		}

		if (this.drop) {
			params.set("dropoff[latitude]", this.drop.latitude.toString());
			params.set("dropoff[longitude]", this.drop.longitude.toString());
			params.set("dropoff[nickname]", this.drop.addressLine1);
			params.set("dropoff[formatted_address]", this.drop.addressLine2);
		}

		if (this.product_id) params.set("product_id", this.product_id);
		if (this.link_text) params.set("link_text", this.link_text);
		if (this.partner_deeplink) params.set("partner_deeplink", this.partner_deeplink);

		return `${baseDeeplink}?${params.toString()}`;
	}

	setPickup(longitude: number, latitude: number, addressLine1: string, addressLine2: string): this;
	setPickup(location: UberLocation | "my_location"): this;
	setPickup(longitudeOrLocation: number | UberLocation | "my_location", latitude?: number, addressLine1?: string, addressLine2?: string): this {
		if (typeof longitudeOrLocation === "number" && latitude !== undefined && addressLine1 !== undefined && addressLine2 !== undefined) {
			this.pickup = {
				latitude,
				longitude: longitudeOrLocation,
				addressLine1,
				addressLine2
			};
		} else {
			this.pickup = longitudeOrLocation as UberLocation | "my_location";
		}
		return this;
	}

	setDrop(location: UberLocation): this {
		this.drop = location;
		return this;
	}

	setProductId(productId: string): this {
		this.product_id = productId;
		return this;
	}

	setLinkText(text: string): this {
		this.link_text = text;
		return this;
	}

	setPartnerDeeplink(deeplink: string): this {
		this.partner_deeplink = deeplink;
		return this;
	}

	setClientId(clientId: string): this {
		this.clientId = clientId;
		return this;
	}
}

interface UberLocation {
	latitude: number,
	longitude: number,
	/**
	 * The first line of the address, e.g., "UberHQ"
	 * @example "The Spot"
	 * @name addressLine1 
	 * @name pickup[nickname]
	 */
	addressLine1: string,
	/**
	 * The second line of the address, e.g., "1455 Market St, San Francisco, CA 94103"
	 * @example "Bottova 2/A, 811 09 Bratislava"
	 * @name addressLine2
	 * @name pickup[formatted_address]
	 */
	addressLine2: string
}

