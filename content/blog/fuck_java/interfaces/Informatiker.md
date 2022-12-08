public interface Informatiker{
    final int MAX_STUNDEN_SCHLAF = 10;

    default void printMaxSchlaf(){
        System.out.println(MAX_STUNDEN_SCHLAF);
    }

    void schlafen(int stunden);

    void programmieren(int stundenSchlaf, int kaffeeKonsum);

}