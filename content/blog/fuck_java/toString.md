@Override
public String toString() {
	StringBuilder sb = new StringBuilder();
	sb.append("OrderVO");

	if (timestampStartedOrder == null) {
		sb.append("");
	} else {
		sb.append(timestampStartedOrder.format(DateTimeFormatter.ofPattern("dd.mm.yyyy hh:mm")));
	}

	sb.append("from");

	if (timestampDeliveredOrder == null) {
		sb.append("");
	} else {
		sb.append(timestampDeliveredOrder.format(DateTimeFormatter.ofPattern("dd.mm.yyyy hh:mm")));
	}

	sb.append("with delivery at");

	for (PizzaVO i : shoppingBasket) {
		if (i == null) {
			sb.append("");
		} else {
			sb.append(i);
		}
	}

	sb.append("\n of customer:");
	sb.append(customer.toString());
	sb.append(", Id of customer:");
	sb.append(customer.getId());
	sb.append(";");

	String str = sb.toString();
	return str;
}