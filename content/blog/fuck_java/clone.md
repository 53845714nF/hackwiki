class Dog {
	private String name;
	private float kilo;

	public Dog clone(){
		Dog neuerHund;
		neuerHund = new Dog(this.name, this.kilo);
		return neuerHund;
	}
}