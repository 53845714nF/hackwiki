public class ZuHoherKaffeekonsumException extends Exception {
    private static final long serialVersionUID = 78439L; 
    
    public ZuHoherKaffeekonsumException(){
        super("Zu hoher Kaffe");
    }

    public ZuHoherKaffeekonsumException(String mesg){
        super(mesg);
    }
}