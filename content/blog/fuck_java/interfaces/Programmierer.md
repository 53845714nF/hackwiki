public class Programmierer implements Informatiker{
    private int currentKaffeeKonsum;
    private int currentStundenSchlaf;

    public Programmierer(int currentKaffeeKonsum, int currentStundenSchlaf){
        setCurrentKaffeeKonsum(currentKaffeeKonsum);
        setCurrentStundenSchlaf(currentStundenSchlaf);
    }

    public Programmierer(){
        this(0, 0);
    }

    @Override
    public void schlafen(int stunden){
        this.currentStundenSchlaf += stunden;
        if(this.currentStundenSchlaf > MAX_STUNDEN_SCHLAF) //// HÄÄÄÄÄ
            this.currentStundenSchlaf = MAX_STUNDEN_SCHLAF;
        setCurrentKaffeeKonsum(this.currentKaffeeKonsum - (stunden / 2));
    }

    @Override
    public void programmieren(int stundenSchlaf, int kaffeeKonsum){
        if(stundenSchlaf > kaffeeKonsum){
            int dif = stundenSchlaf - kaffeeKonsum;
            setCurrentStundenSchlaf(this.currentStundenSchlaf + dif);
            setCurrentKaffeeKonsum(this.currentKaffeeKonsum - dif);
        }else if(kaffeeKonsum > stundenSchlaf){
            int dif = kaffeeKonsum - stundenSchlaf;
            setCurrentStundenSchlaf(this.currentStundenSchlaf - dif);
            setCurrentKaffeeKonsum(this.currentKaffeeKonsum + dif);
        }
    }

    // Getter /Setter 
    public int getCurrentStundenSchlaf(){
        return this.currentStundenSchlaf;
    }

    public void setCurrentStundenSchlaf(int currentStundenSchlaf){
        if(currentStundenSchlaf <= MAX_STUNDEN_SCHLAF)
            this.currentStundenSchlaf = currentStundenSchlaf;
    }

    public int getCurrentKaffeeKonsum(){
        return this.currentKaffeeKonsum;
    }

    public void setCurrentKaffeeKonsum(int currentKaffeeKonsum){
        this.currentKaffeeKonsum = currentKaffeeKonsum;
    }



}