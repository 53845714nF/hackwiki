public class AthleteVO implements Comparable<AthleteVO> {

	private String name;

	public AthleteVO(String name) {
		setName(name);
	}

	public AthleteVO() {
		this(null);
	}

	public String toString() {
		return name;
	}

	@Override
    public int compareTo(AthleteVO obj){
        // this = obj --> 0
    	// this > obj --> 1
    	// this < obj --> -1
    	if (name == null ) {
        	if(obj.getName() == null) {
        		return 0;
        	} else {
        		return -1;
        	}
    	}
    	
        return name.compareTo(obj.getName());
    	
	}
}