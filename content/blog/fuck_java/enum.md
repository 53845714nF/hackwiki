public enum Spezies {
	SCHWALBE("Schwalbe"), WILDGANZ("Wildganz");
	
	private String name;
	
	private Spezies(String name) {
		this.name = name;
	}
	
	public String toString() {
		return name;
	}
	
}