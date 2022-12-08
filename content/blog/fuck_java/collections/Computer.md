public class Computer implements Comparable<Computer>{
    private String modell;
    private int leistung;

    public Computer(){
        this(null, 0);
    }

    public Computer(String modell, int leistung){
        setModell(modell);
        setLeistung(leistung);
    }

    @Override
    public int compareTo(Computer o){
        return Integer.compare(this.getLeistung(), o.getLeistung());
    }

    // Getter / Setter 
    public String getModell(){
        return modell;
    }

    public void setModell(String modell){
        this.modell = modell;
    }

    public int getLeistung(){
        return leistung;
    }

    public void setLeistung(int leistung){
        this.leistung = leistung;
    }
}