package academ.rostAbacus;

import java.util.Random;

public interface Generatable {
    int head(int sum);
    int tail(int sum, boolean isPlus);
    Random random = new Random();

}
