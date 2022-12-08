import java.util.List;
import java.util.LinkedList;
import java.util.Collections;
import java.util.Comparator;

public class Programmierer{
    private int kaffeekonsum;
    private List<Computer> myComputer;

    public Programmierer(){
        this(0);
    }

    public Programmierer(int kaffeekonsum){
        setKaffeekonsum(kaffeekonsum);
        myComputer = new LinkedList<Computer>();
    }

    public void addComputer(Computer com){
        myComputer.add(com);
    }

    public boolean deleteComputer(Computer com){
        return myComputer.remove(com);
    }

    public void deleteLastComputer(){
        myComputer.remove(myComputer.size() -1);
    }

    public void sortComputer(){
        Collections.sort(myComputer);
    }

    public void sortComputerByModell(){
        myComputer.sort(Comparator.comparing(Computer::getModell, Comparator.nullsFirst(String::compareTo)));
    }

    // Getter / Setter
    public int getKaffeekonsum(){
        return kaffeekonsum;
    }

    public void setKaffeekonsum(int kaffeekonsum){
        this.kaffeekonsum = kaffeekonsum;
    }

    public List<Computer> getMyComputer(){
        return this.myComputer;
    }

    public void setComputer(List<Computer> myComputer){
        this.myComputer = myComputer;
    }
}