public class Programmierer{
    private int kaffeekonsum;
    private String name;
    private static final int MAX_KAFFEEKONSUM = 100;

    public Programmierer(int kaffeekonsum, String name){
        try {
        setKaffeekonsum(kaffeekonsum);
        } catch (ZuHoherKaffeekonsumException e){
            this.kaffeekonsum = MAX_KAFFEEKONSUM;     
        } catch (NegativerKaffeekonsumException e){
            this.kaffeekonsum = 0; 
        }
        
        setName(name);
    }

    public Programmierer(){
        this(0, "Lovelace");
    }

    public void trinken(int kaffee) throws ZuHoherKaffeekonsumException{
        int newKaffee = getKaffeekonsum() + kaffee;
        
        if(newKaffee > MAX_KAFFEEKONSUM){
            throw new ZuHoherKaffeekonsumException();
        }
        
        if(newKaffee < 0 ){
            throw new NegativerKaffeekonsumException();
        }
        
        setKaffeekonsum(newKaffee);
        
    }

    // Getter und Setter
    public int getKaffeekonsum(){
        return kaffeekonsum;
    }

    public void setKaffeekonsum(int kaffee) throws ZuHoherKaffeekonsumException {
        
        if(kaffee > MAX_KAFFEEKONSUM){
            throw new ZuHoherKaffeekonsumException();
        }
        
        if (kaffee < 0 ){
            throw new NegativerKaffeekonsumException();
        }
        
        this.kaffeekonsum = kaffee;
        
        
    }

     public void setName(String name) throws NullPointerException{
        if(name == null){
            throw new NullPointerException();
        }
        this.name = name;
    }

    public String getName(){
        return name;
    }

    public static int getMAX_KAFFEEKONSUM(){
        return MAX_KAFFEEKONSUM;
    }
}