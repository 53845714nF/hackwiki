public class DataAnalyst extends Wirtschaftsinformatiker{
    private int wissensstand;

    public DataAnalyst(int kaffeekonsum, int wissensstand){
        super(kaffeekonsum);
        setWissensstand(wissensstand);
    }

    public DataAnalyst(){
        this(0,0);
    }

    @Override
    public void lernen(int stunden){
        kaffeekonsum += (stunden/2);
        int newWissensstand = this.wissensstand + 10 * stunden;
        if(newWissensstand > 100)
            setWissensstand(100);
        else if (newWissensstand < 0)
            setWissensstand(0);
        else
            setWissensstand(newWissensstand);
    }

    // Getter / Setter
    public int getWissensstand(){
        return wissensstand;
    }

    public void setWissensstand(int wissensstand){
        if(wissensstand >= 0 && wissensstand <= 100)
            this.wissensstand = wissensstand;
    }

}