package view;

public class Line {

    double difference = 15;
    Point start;
    Point end;

    Line(Point a, Point b) {

        this.start = a;
        this.end = b;

    }

    public boolean distancePointToSegment(double px, double py) {
        double x1 = start.x;
        double y1 = start.y;
        double x2 = end.x;
        double y2 = end.y;

        double dx = x2 - x1;
        double dy = y2 - y1;
        double along = ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy);
        if (along <= 0) {
            return Math.sqrt((px - x1) * (px - x1) + (py - y1) * (py - y1)) < difference;
        } else if (along >= 1) {
            return Math.sqrt((px - x2) * (px - x2) + (py - y2) * (py - y2)) < difference;
        } else {
            double x = x1 + along * dx;
            double y = y1 + along * dy;
            return Math.sqrt((px - x) * (px - x) + (py - y) * (py - y)) < difference;
        }
    }

}
