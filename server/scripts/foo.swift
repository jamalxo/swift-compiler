import Swift
import Foundation

setbuf(__stdoutp, nil); // for live output

print("Hello, World!");
for index in 1...5 {
    usleep(1000000);
    print("\(index) times 5 is \(index * 5)")
};