const problems = [
 {
        chapter: 1,
        problemCode: "A",
        title: "Find Maximum Element",
        difficulty: "Easy",
        description: "Given an array of integers, print the maximum element in the array.",
        constraints: "1 ≤ N ≤ 10^5",

        starterCode: {
            c: `#include <stdio.h>
#include <limits.h>

int main(){
int n;
scanf("%d",&n);

long long x,maxVal=LLONG_MIN;

for(int i=0;i<n;i++){
scanf("%lld",&x);
if(x>maxVal) maxVal=x;
}

printf("%lld",maxVal);
return 0;
}`,

            java: `import java.util.*;

public class Main{
public static void main(String[] args){

Scanner sc=new Scanner(System.in);

int n=sc.nextInt();
long maxVal=Long.MIN_VALUE;

for(int i=0;i<n;i++){
long x=sc.nextLong();
if(x>maxVal) maxVal=x;
}

System.out.print(maxVal);
}
}`,

            python: `n=int(input())
arr=list(map(int,input().split()))
print(max(arr))`
        },

        testCases: [
            { input: "5\n1 9 3 7 2", expectedOutput: "9" }
        ]
    },

    {
        chapter: 1,
        problemCode: "B",
        title: "Reverse an Array",
        difficulty: "Easy",
        description: "Reverse the given array.",
        constraints: "1 ≤ N ≤ 10^5",

        starterCode: {
            c: `#include <stdio.h>

int main(){
int n;
scanf("%d",&n);

long long arr[100000];

for(int i=0;i<n;i++)
scanf("%lld",&arr[i]);

for(int i=n-1;i>=0;i--){
printf("%lld",arr[i]);
if(i!=0) printf(" ");
}

return 0;
}`,

            java: `import java.util.*;

public class Main{
public static void main(String[] args){

Scanner sc=new Scanner(System.in);

int n=sc.nextInt();
long[] arr=new long[n];

for(int i=0;i<n;i++)
arr[i]=sc.nextLong();

for(int i=n-1;i>=0;i--){
System.out.print(arr[i]);
if(i!=0) System.out.print(" ");
}
}
}`,

            python: `n=int(input())
arr=list(map(int,input().split()))
print(*arr[::-1])`
        },

        testCases: [
            { input: "4\n10 20 30 40", expectedOutput: "40 30 20 10" }
        ]
    },

    {
        chapter: 1,
        problemCode: "C",
        title: "Count Even Numbers",
        difficulty: "Easy",
        description: "Count how many numbers are even in the given array.",
        constraints: "1 ≤ N ≤ 10^5",

        starterCode: {
            c: `#include <stdio.h>

int main(){
int n;
scanf("%d",&n);

long long x;
int count=0;

for(int i=0;i<n;i++){
scanf("%lld",&x);
if(x%2==0) count++;
}

printf("%d",count);
return 0;
}`,

            java: `import java.util.*;

public class Main{
public static void main(String[] args){

Scanner sc=new Scanner(System.in);

int n=sc.nextInt();
int count=0;

for(int i=0;i<n;i++){
long x=sc.nextLong();
if(x%2==0) count++;
}

System.out.print(count);
}
}`,

            python: `n=int(input())
arr=list(map(int,input().split()))
print(sum(1 for x in arr if x%2==0))`
        },

        testCases: [
            { input: "6\n1 2 3 4 5 6", expectedOutput: "3" }
        ]
    },

    {
        chapter: 1,
        problemCode: "D",
        title: "Sum of Digits",
        difficulty: "Easy",
        description: "Find the sum of digits of a number.",
        constraints: "0 ≤ N ≤ 10^18",

        starterCode: {
            c: `#include <stdio.h>

int main(){
long long n;
scanf("%lld",&n);

long long sum=0;

while(n>0){
sum+=n%10;
n/=10;
}

printf("%lld",sum);
return 0;
}`,

            java: `import java.util.*;

public class Main{
public static void main(String[] args){

Scanner sc=new Scanner(System.in);

long n=sc.nextLong();
long sum=0;

while(n>0){
sum+=n%10;
n/=10;
}

System.out.print(sum);
}
}`,

            python: `n=int(input())
s=0
while n>0:
s+=n%10
n//=10
print(s)`
        },

        testCases: [
            { input: "12345", expectedOutput: "15" }
        ]
    },

    {
        chapter: 2,
        problemCode: "A",
        title: "Check Palindrome String",
        difficulty: "Easy",
        description: "Check whether a string is palindrome.",
        constraints: "1 ≤ |S| ≤ 10^5",

        starterCode: {
            c: `#include <stdio.h>
#include <string.h>

int main(){
char s[100005];
scanf("%s",s);

int i=0,j=strlen(s)-1;

while(i<j){
if(s[i]!=s[j]){
printf("NO");
return 0;
}
i++;j--;
}

printf("YES");
return 0;
}`,

            java: `import java.util.*;

public class Main{
public static void main(String[] args){

Scanner sc=new Scanner(System.in);

String s=sc.next();

int i=0,j=s.length()-1;

while(i<j){
if(s.charAt(i)!=s.charAt(j)){
System.out.print("NO");
return;
}
i++;j--;
}

System.out.print("YES");
}
}`,

            python: `s=input().strip()
print("YES" if s==s[::-1] else "NO")`
        },

        testCases: [
            { input: "madam", expectedOutput: "YES" }
        ]
    },

    {
        chapter: 2,
        problemCode: "B",
        title: "Two Sum (Index Pair)",
        difficulty: "Medium",
        description: "Given an array and target X, return any pair of indices such that arr[i] + arr[j] = X.",
        constraints: "2 ≤ N ≤ 10^5",

        starterCode: {
            c: `#include <stdio.h>
#include <stdlib.h>

int main(){
int n;
scanf("%d",&n);

long long arr[100000];
for(int i=0;i<n;i++) scanf("%lld",&arr[i]);

long long target;
scanf("%lld",&target);

for(int i=0;i<n;i++){
for(int j=i+1;j<n;j++){
if(arr[i]+arr[j]==target){
printf("%d %d",i,j);
return 0;
}
}
}

printf("-1");
return 0;
}`,

            java: `import java.util.*;

public class Main{
public static void main(String[] args){

Scanner sc=new Scanner(System.in);

int n=sc.nextInt();
long[] arr=new long[n];

for(int i=0;i<n;i++)
arr[i]=sc.nextLong();

long target=sc.nextLong();

HashMap<Long,Integer> map=new HashMap<>();

for(int i=0;i<n;i++){
long need=target-arr[i];

if(map.containsKey(need)){
System.out.print(map.get(need)+" "+i);
return;
}

map.put(arr[i],i);
}

System.out.print("-1");
}
}`,

            python: `n=int(input())
arr=list(map(int,input().split()))
target=int(input())

mp={}
for i,x in enumerate(arr):
if target-x in mp:
print(mp[target-x],i)
break
mp[x]=i
else:
print(-1)`
        },

        testCases: [
            { input: "5\n2 7 11 15 3\n9", expectedOutput: "0 1" }
        ]
    },

    {
        chapter: 2,
        problemCode: "C",
        title: "Balanced Parentheses",
        difficulty: "Medium",
        description: "Check if parentheses are balanced.",
        constraints: "1 ≤ |S| ≤ 10^5",

        starterCode: {
            c: `#include <stdio.h>
#include <string.h>

int main(){

char s[100005];
scanf("%s",s);

char stack[100005];
int top=-1;

for(int i=0;i<strlen(s);i++){

char c=s[i];

if(c=='('||c=='{'||c=='[')
stack[++top]=c;

else{

if(top==-1){
printf("NO");
return 0;
}

char t=stack[top--];

if((t=='('&&c!=')')||(t=='{'&&c!='}')||(t=='['&&c!=']')){
printf("NO");
return 0;
}

}

}

printf(top==-1?"YES":"NO");
return 0;
}`,

            java: `import java.util.*;

public class Main{

public static void main(String[] args){

Scanner sc=new Scanner(System.in);

String s=sc.next();

Stack<Character> st=new Stack<>();

for(char c:s.toCharArray()){

if(c=='('||c=='{'||c=='[')
st.push(c);

else{

if(st.isEmpty()){
System.out.print("NO");
return;
}

char t=st.pop();

if((t=='('&&c!=')')||(t=='{'&&c!='}')||(t=='['&&c!=']')){
System.out.print("NO");
return;
}

}

}

System.out.print(st.isEmpty()?"YES":"NO");
}
}`,

            python: `s=input().strip()

stack=[]
mp={')':'(',']':'[','}':'{'}

for ch in s:

if ch in "([{":
stack.append(ch)

else:

if not stack or stack[-1]!=mp[ch]:
print("NO")
break

stack.pop()

else:
print("YES" if not stack else "NO")`
        },

        testCases: [
            { input: "{[()]}", expectedOutput: "YES" }
        ]
    },

    {

        chapter: 2,
        problemCode: "D",
        title: "First Unique Character",
        difficulty: "Medium",
        description: "Find the index of the first non-repeating character in a string.",
        constraints: "1 ≤ |S| ≤ 10^5",

        starterCode: {
            c: `#include <stdio.h>
#include <string.h>

int main(){

char s[100005];
scanf("%s",s);

int freq[26]={0};
int n=strlen(s);

for(int i=0;i<n;i++)
freq[s[i]-'a']++;

for(int i=0;i<n;i++){
if(freq[s[i]-'a']==1){
printf("%d",i);
return 0;
}
}

printf("-1");
return 0;
}`,

            java: `import java.util.*;

public class Main{

public static void main(String[] args){

Scanner sc=new Scanner(System.in);

String s=sc.next();

int[] freq=new int[26];

for(char c:s.toCharArray())
freq[c-'a']++;

for(int i=0;i<s.length();i++){
if(freq[s.charAt(i)-'a']==1){
System.out.print(i);
return;
}
}

System.out.print(-1);
}
}`,

            python: `s=input().strip()

freq={}
for ch in s:
freq[ch]=freq.get(ch,0)+1

for i,ch in enumerate(s):
if freq[ch]==1:
print(i)
break
else:
print(-1)`
        },

        testCases: [
            { input: "leetcode", expectedOutput: "0" }
        ]
    },

    {
        chapter: 3,
        problemCode: "A",
        title: "Rotate Array by K",
        difficulty: "Medium",
        description: "Rotate array to the right by K positions.",
        constraints: "1 ≤ N ≤ 10^5",

        starterCode: {
            c: `#include <stdio.h>

int main(){

int n;
scanf("%d",&n);

long long arr[100000];

for(int i=0;i<n;i++)
scanf("%lld",&arr[i]);

long long k;
scanf("%lld",&k);

k%=n;

long long temp[100000];

for(int i=0;i<n;i++)
temp[(i+k)%n]=arr[i];

for(int i=0;i<n;i++){
printf("%lld",temp[i]);
if(i!=n-1) printf(" ");
}

return 0;
}`,

            java: `import java.util.*;

public class Main{

public static void main(String[] args){

Scanner sc=new Scanner(System.in);

int n=sc.nextInt();

long[] arr=new long[n];

for(int i=0;i<n;i++)
arr[i]=sc.nextLong();

long k=sc.nextLong();

k%=n;

long[] temp=new long[n];

for(int i=0;i<n;i++)
temp[(int)((i+k)%n)]=arr[i];

for(int i=0;i<n;i++){

System.out.print(temp[i]);

if(i!=n-1)
System.out.print(" ");

}

}
}`,

            python: `n=int(input())
arr=list(map(int,input().split()))
k=int(input())

k%=n

res=arr[-k:]+arr[:-k]

print(*res)`
        },

        testCases: [
            { input: "5\n1 2 3 4 5\n2", expectedOutput: "4 5 1 2 3" }
        ]
    },

    {
        chapter: 3,
        problemCode: "B",
        title: "Merge Two Sorted Arrays",
        difficulty: "Medium",
        description: "Merge two sorted arrays into a single sorted array.",
        constraints: "1 ≤ N,M ≤ 10^5",

        starterCode: {
            c: `#include <stdio.h>

int main(){

int n,m;

scanf("%d",&n);

long long a[100000];

for(int i=0;i<n;i++)
scanf("%lld",&a[i]);

scanf("%d",&m);

long long b[100000];

for(int i=0;i<m;i++)
scanf("%lld",&b[i]);

int i=0,j=0;

while(i<n && j<m){

if(a[i]<=b[j])
printf("%lld ",a[i++]);

else
printf("%lld ",b[j++]);

}

while(i<n)
printf("%lld ",a[i++]);

while(j<m)
printf("%lld ",b[j++]);

return 0;
}`,

            java: `import java.util.*;

public class Main{

public static void main(String[] args){

Scanner sc=new Scanner(System.in);

int n=sc.nextInt();

long[] a=new long[n];

for(int i=0;i<n;i++)
a[i]=sc.nextLong();

int m=sc.nextInt();

long[] b=new long[m];

for(int i=0;i<m;i++)
b[i]=sc.nextLong();

int i=0,j=0;

StringBuilder sb=new StringBuilder();

while(i<n && j<m){

if(a[i]<=b[j])
sb.append(a[i++]).append(" ");

else
sb.append(b[j++]).append(" ");

}

while(i<n)
sb.append(a[i++]).append(" ");

while(j<m)
sb.append(b[j++]).append(" ");

System.out.print(sb.toString().trim());
}
}`,

            python: `n=int(input())
a=list(map(int,input().split()))
m=int(input())
b=list(map(int,input().split()))

i=j=0
res=[]

while i<n and j<m:

if a[i]<=b[j]:
res.append(a[i]); i+=1

else:
res.append(b[j]); j+=1

res.extend(a[i:])
res.extend(b[j:])

print(*res)`
        },

        testCases: [
            { input: "3\n1 3 5\n4\n2 4 6 7", expectedOutput: "1 2 3 4 5 6 7" }
        ]
    },

    {
        chapter: 3,
        problemCode: "C",
        title: "Longest Subarray with Sum K",
        difficulty: "Hard",
        description: "Find the length of the longest subarray having sum exactly K.",
        constraints: "1 ≤ N ≤ 2×10^5",

        starterCode: {
            c: `#include <stdio.h>

int main(){

int n;
scanf("%d",&n);

long long arr[200000];

for(int i=0;i<n;i++)
scanf("%lld",&arr[i]);

long long k;
scanf("%lld",&k);

int best=0;

for(int i=0;i<n;i++){

long long sum=0;

for(int j=i;j<n;j++){

sum+=arr[j];

if(sum==k){

int len=j-i+1;

if(len>best)
best=len;

}

}

}

printf("%d",best);

return 0;

}`,

            java: `import java.util.*;

public class Main{

public static void main(String[] args){

Scanner sc=new Scanner(System.in);

int n=sc.nextInt();

long[] arr=new long[n];

for(int i=0;i<n;i++)
arr[i]=sc.nextLong();

long k=sc.nextLong();

long prefix=0;

HashMap<Long,Integer> map=new HashMap<>();

map.put(0L,-1);

int best=0;

for(int i=0;i<n;i++){

prefix+=arr[i];

if(map.containsKey(prefix-k)){

best=Math.max(best,i-map.get(prefix-k));

}

map.putIfAbsent(prefix,i);

}

System.out.print(best);

}

}`,

            python: `n=int(input())
arr=list(map(int,input().split()))
k=int(input())

prefix=0
mp={0:-1}
best=0

for i,x in enumerate(arr):

prefix+=x

if prefix-k in mp:
best=max(best,i-mp[prefix-k])

if prefix not in mp:
mp[prefix]=i

print(best)`
        },

        testCases: [
            { input: "7\n1 2 3 -2 5 -3 1\n3", expectedOutput: "4" }
        ]
    },

    {
        chapter: 3,
        problemCode: "D",
        title: "Next Greater Element",
        difficulty: "Medium",
        description: "Find next greater element for each element in the array.",
        constraints: "1 ≤ N ≤ 2×10^5",

        starterCode: {
            c: `#include <stdio.h>

int main(){

int n;

scanf("%d",&n);

long long arr[200000];

for(int i=0;i<n;i++)
scanf("%lld",&arr[i]);

long long ans[200000];

int stack[200000];

int top=-1;

for(int i=n-1;i>=0;i--){

while(top!=-1 && arr[stack[top]]<=arr[i])
top--;

if(top==-1)
ans[i]=-1;

else
ans[i]=arr[stack[top]];

stack[++top]=i;

}

for(int i=0;i<n;i++){

printf("%lld",ans[i]);

if(i!=n-1)
printf(" ");

}

return 0;

}`,

            java: `import java.util.*;

public class Main{

public static void main(String[] args){

Scanner sc=new Scanner(System.in);

int n=sc.nextInt();

long[] arr=new long[n];

for(int i=0;i<n;i++)
arr[i]=sc.nextLong();

long[] ans=new long[n];

Stack<Long> st=new Stack<>();

for(int i=n-1;i>=0;i--){

while(!st.isEmpty() && st.peek()<=arr[i])
st.pop();

ans[i]=st.isEmpty()?-1:st.peek();

st.push(arr[i]);

}

for(int i=0;i<n;i++){

System.out.print(ans[i]);

if(i!=n-1)
System.out.print(" ");

}

}

}`,

            python: `n=int(input())
arr=list(map(int,input().split()))

stack=[]
ans=[-1]*n

for i in range(n-1,-1,-1):

while stack and stack[-1]<=arr[i]:
stack.pop()

ans[i]=stack[-1] if stack else -1

stack.append(arr[i])

print(*ans)`
        },

        testCases: [
            { input: "4\n4 5 2 25", expectedOutput: "5 25 25 -1" }
        ]
    },

    {
        chapter: 4,
        problemCode: "A",
        title: "Detect Cycle in Linked List",
        difficulty: "Easy",
        description: "Determine if linked list contains a cycle.",
        constraints: "0 ≤ N ≤ 10^5",

        starterCode: {
            c: `#include <stdio.h>

int main(){

int n;

scanf("%d",&n);

long long arr[100000];

for(int i=0;i<n;i++)
scanf("%lld",&arr[i]);

int pos;

scanf("%d",&pos);

if(pos==-1)
printf("NO");

else
printf("YES");

return 0;

}`,

            java: `import java.util.*;

public class Main{

public static void main(String[] args){

Scanner sc=new Scanner(System.in);

int n=sc.nextInt();

for(int i=0;i<n;i++)
sc.nextLong();

int pos=sc.nextInt();

System.out.print(pos==-1?"NO":"YES");

}

}`,

            python: `n=int(input())
arr=list(map(int,input().split()))
pos=int(input())

print("NO" if pos==-1 else "YES")`
        },

        testCases: [
            { input: "5\n3 2 0 -4 5\n1", expectedOutput: "YES" }
        ]
    },

    {
        chapter: 4,
        problemCode: "B",
        title: "Lowest Common Ancestor in BST",
        difficulty: "Medium",
        description: "Find LCA of two nodes in a BST.",
        constraints: "1 ≤ N ≤ 10^5",

        starterCode: {
            c: `#include <stdio.h>

int main(){

int n;

scanf("%d",&n);

long long arr[100000];

for(int i=0;i<n;i++)
scanf("%lld",&arr[i]);

long long p,q;

scanf("%lld %lld",&p,&q);

long long low=p<q?p:q;

long long high=p>q?p:q;

for(int i=0;i<n;i++){

if(arr[i]>=low && arr[i]<=high){

printf("%lld",arr[i]);

break;

}

}

return 0;

}`,

            java: `import java.util.*;

public class Main{

public static void main(String[] args){

Scanner sc=new Scanner(System.in);

int n=sc.nextInt();

long[] arr=new long[n];

for(int i=0;i<n;i++)
arr[i]=sc.nextLong();

long p=sc.nextLong();

long q=sc.nextLong();

long low=Math.min(p,q);

long high=Math.max(p,q);

for(long x:arr){

if(x>=low && x<=high){

System.out.print(x);

break;

}

}

}

}`,

            python: `n=int(input())
arr=list(map(int,input().split()))
p,q=map(int,input().split())

low=min(p,q)
high=max(p,q)

for x in arr:
if low<=x<=high:
print(x)
break`
        },

        testCases: [
            { input: "7\n6 2 8 0 4 7 9\n2 8", expectedOutput: "6" }
        ]
    },

    {
        chapter: 4,
        problemCode: "C",
        title: "Sliding Window Maximum",
        difficulty: "Hard",
        description: "Find maximum value in each sliding window of size K.",
        constraints: "1 ≤ N ≤ 2×10^5",

        starterCode: {
            c: `#include <stdio.h>

int main(){

int n;

scanf("%d",&n);

long long arr[200000];

for(int i=0;i<n;i++)
scanf("%lld",&arr[i]);

int k;

scanf("%d",&k);

int dq[200000];

int front=0,back=-1;

for(int i=0;i<n;i++){

if(front<=back && dq[front]<=i-k)
front++;

while(front<=back && arr[dq[back]]<=arr[i])
back--;

dq[++back]=i;

if(i>=k-1){

printf("%lld",arr[dq[front]]);

if(i!=n-1)
printf(" ");

}

}

return 0;

}`,

            java: `import java.util.*;

public class Main{

public static void main(String[] args){

Scanner sc=new Scanner(System.in);

int n=sc.nextInt();

long[] arr=new long[n];

for(int i=0;i<n;i++)
arr[i]=sc.nextLong();

int k=sc.nextInt();

Deque<Integer> dq=new ArrayDeque<>();

StringBuilder sb=new StringBuilder();

for(int i=0;i<n;i++){

while(!dq.isEmpty() && dq.peekFirst()<=i-k)
dq.pollFirst();

while(!dq.isEmpty() && arr[dq.peekLast()]<=arr[i])
dq.pollLast();

dq.addLast(i);

if(i>=k-1){

sb.append(arr[dq.peekFirst()]);

if(i!=n-1)
sb.append(" ");

}

}

System.out.print(sb.toString().trim());

}

}`,

            python: `from collections import deque

n=int(input())
arr=list(map(int,input().split()))
k=int(input())

dq=deque()
res=[]

for i in range(n):

while dq and dq[0]<=i-k:
dq.popleft()

while dq and arr[dq[-1]]<=arr[i]:
dq.pop()

dq.append(i)

if i>=k-1:
res.append(arr[dq[0]])

print(*res)`
        },

        testCases: [
            { input: "8\n1 3 -1 -3 5 3 6 7\n3", expectedOutput: "3 3 5 5 6 7" }
        ]
    }



]

module.exports = problems;