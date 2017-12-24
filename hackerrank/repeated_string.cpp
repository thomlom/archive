#include <cmath>
#include <iostream>

using namespace std;


int main(){
    string s;
    cin >> s;
    long n;
    cin >> n;
    long counter = 0, counter2 = 0;
    long numberOfWords = floor(n/s.size());
    long lettersRemaining = n % s.size();
    
    for (int i = 0; i < s.size(); i++) {
        if (s[i] == 'a') {
            counter++;
        }  
    }
    
    for (int i = 0; i < lettersRemaining; i++) {
        if (s[i] == 'a') {
            counter2++;
        } 
    }
    cout << (numberOfWords*counter) + counter2;
    return 0;
}