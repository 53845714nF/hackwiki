public class NegativerKaffeekonsumException extends RuntimeException {

     private static final long serialVersionUID = 8423536293234232235L;
   
    public NegativerKaffeekonsumException(){
        super("Zu wenig Kaffe");
    }
    
    public NegativerKaffeekonsumException(String mesg){
        super(mesg);
    }
    
}