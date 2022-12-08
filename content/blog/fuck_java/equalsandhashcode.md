@Override
public boolean equals(Object o) {
	if (this == o)
		return true;
	if (o == null || this.getClass() != o.getClass())
		return false;

	OrderVO order = (OrderVO) o;
	return Objects.equals(this.orderNo, order.orderNo) && Objects.equals(this.index, order.index)
			&& Objects.equals(this.timestampStartedOrder, order.timestampStartedOrder)
			&& Objects.equals(this.timestampDeliveredOrder, order.timestampDeliveredOrder)
			&& Objects.equals(this.shoppingBasket, order.shoppingBasket)
			&& Objects.equals(this.customer, order.customer);
}

@Override
public int hashCode() {
	int hc = 89;
	final int hashMultiplier = 97;
	hc = hc * hashMultiplier + ((name == null) ? 0 : name.hashCode());
	hc = hc * hashMultiplier + ((price == 0.0F) ? 0 : Float.floatToIntBits(price));
	hc = hc * hashMultiplier + ((ingredients == null) ? 0 : ingredients.hashCode());
	return hc;
}

// oder

@Override
public int hashCode() {
	return Objects.hash(firstName, houseNumber, lastName, street);
}