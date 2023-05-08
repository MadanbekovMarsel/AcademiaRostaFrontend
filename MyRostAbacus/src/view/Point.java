package view;

public class Point{
    public double x;
    public double y;

    Point(double x,double y){
        this.x = x;
        this.y = y;
    }

    public static double distance(Point a, Point b){
        return Math.sqrt((a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y-b.y));
    }
}