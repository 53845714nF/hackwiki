public abstract class Wirtschaftsinformatiker{
    protected int kaffeekonsum;

    public Wirtschaftsinformatiker(int kaffeekonsum){
        setKaffeekonsum(kaffeekonsum);
    }

    public abstract void lernen(int stunden);

    public void trinken(int kaffee){
        kaffeekonsum += kaffee;
    }

    // Setter / Getter
    public int getKaffeekonsum(){
        return kaffeekonsum;
    }

    public void setKaffeekonsum(int kaffeekonsum){
        this.kaffeekonsum = kaffeekonsum;
    }
}