/**
 * DSA QUESTION BANK — Complete 5-Phase System
 * Structure: Topic → SubTopic → Phase → 5 Questions each
 *
 * Topics: Arrays, Strings, LinkedList, Stack, Queue,
 *         Trees, Graphs, Sorting, Searching, DynamicProgramming, Hashing
 *
 * Phases (sub-sub-topics):
 *   objective   — MCQ concept check
 *   codeEditor  — full coding problem with test cases
 *   jumbledCode — arrange shuffled lines in correct order
 *   missingCode — fill in the blanks
 *   optimize    — time/space complexity improvement
 */

const DSA_QUESTIONS = {

  // ═══════════════════════════════════════════════════════════
  //  TOPIC: ARRAYS
  // ═══════════════════════════════════════════════════════════
  Arrays: {
    topicIcon: "📦",
    topicColor: "#3b82f6",
    subtopics: {

      "1D Arrays": {
        objective: [
          {
            id: "arr-obj-1",
            question: "A delivery app stores package weights in an array [4,2,7,1,9,3]. The warehouse robot needs to find the heaviest package in a single scan. What is the minimum time complexity required?",
            options: ["O(1) — just check last element", "O(log N) — binary search", "O(N) — must scan all elements", "O(N²) — compare all pairs"],
            answer: 2,
            explanation: "For an unsorted array, the robot must check every package at least once → O(N). If sorted, O(1) is possible."
          },
          {
            id: "arr-obj-2",
            question: "An e-commerce platform stores product IDs in a zero-indexed array of size 10. What is the valid index range?",
            options: ["1 to 10", "0 to 10", "0 to 9", "1 to 9"],
            answer: 2,
            explanation: "Zero-indexed arrays of size N have valid indices 0 through N-1, so 0 to 9 for size 10."
          },
          {
            id: "arr-obj-3",
            question: "A music streaming app stores play counts. Which operation on a standard array is O(1) time?",
            options: ["Insert at beginning", "Delete from middle", "Access by index", "Search unsorted array"],
            answer: 2,
            explanation: "Array index access is O(1) because memory address = base + index × element_size — computed directly."
          },
          {
            id: "arr-obj-4",
            question: "A hospital patient queue stores 1000 patient IDs. If you insert a new URGENT patient at position 0, how many elements shift?",
            options: ["0", "1", "500", "999"],
            answer: 3,
            explanation: "Inserting at index 0 requires shifting ALL existing 1000 elements (indices 0–999) one position right → 999 shifts if array had 1000 before insert."
          },
          {
            id: "arr-obj-5",
            question: "A stock tracker stores daily prices. You need to find if price X appeared — which approach is fastest on an UNSORTED price array?",
            options: ["Binary Search O(log N)", "Linear Search O(N)", "Hash lookup O(1)", "Sort then binary search O(N log N)"],
            answer: 1,
            explanation: "On an unsorted array, linear search O(N) is the only correct approach. Hash lookup requires preprocessing."
          }
        ],

        codeEditor: [
          {
            id: "arr-code-1",
            title: "Supermarket Stock Checker",
            difficulty: "Easy",
            scenario: "🏪 A supermarket chain's inventory system stores product quantities in an array. The store manager needs to find if any product has gone OUT OF STOCK (quantity = 0). Write a function that returns the INDEX of the first out-of-stock item, or -1 if all are stocked.",
            description: "Given an array of N integers representing stock quantities, return the 0-based index of the first zero, or -1 if none.",
            constraints: "1 ≤ N ≤ 10^5 | 0 ≤ quantities[i] ≤ 10^6",
            starterCode: {
              c: `#include <stdio.h>
int main(){
    int n;
    scanf("%d", &n);
    int arr[100001];
    for(int i = 0; i < n; i++) scanf("%d", &arr[i]);
    
    // TODO: find first zero index
    int result = -1;
    // your code here
    
    printf("%d\\n", result);
    return 0;
}`,
              python: `n = int(input())
arr = list(map(int, input().split()))

result = -1
# TODO: find first zero index

print(result)`
            ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const n = parseInt(lines[0]);
const arr = lines[1].split(' ').map(Number);

// TODO: find first zero index
let result = -1;
// your code here

console.log(result);`
            },
            solutionCode: {
              c: `#include <stdio.h>
int main(){
    int n; scanf("%d",&n);
    int arr[100001];
    for(int i=0;i<n;i++) scanf("%d",&arr[i]);
    int result=-1;
    for(int i=0;i<n;i++){ if(arr[i]==0){ result=i; break; } }
    printf("%d\\n",result);
    return 0;
}`,
              python: `n=int(input())
arr=list(map(int,input().split()))
result=-1
for i,x in enumerate(arr):
    if x==0: result=i; break
print(result)`
            },
            testCases: [
              { input: "5\n10 3 0 7 2", expectedOutput: "2", explanation: "Index 2 has quantity 0" },
              { input: "4\n5 3 8 1", expectedOutput: "-1", explanation: "No out-of-stock items" },
              { input: "3\n0 4 9", expectedOutput: "0", explanation: "First item is out of stock" },
              { input: "1\n0", expectedOutput: "0" },
              { input: "6\n1 2 3 4 5 0", expectedOutput: "5" }
            ]
          },
          {
            id: "arr-code-2",
            title: "Temperature Spike Detector",
            difficulty: "Easy",
            scenario: "🌡️ A climate monitoring station records hourly temperatures. Scientists need to find the MAXIMUM temperature reading of the day to issue heat warnings. Return the maximum value in the array.",
            description: "Given N temperature readings, return the maximum value.",
            constraints: "1 ≤ N ≤ 10^5 | -100 ≤ temp[i] ≤ 100",
            starterCode: {
              python: `n = int(input())
temps = list(map(int, input().split()))
# Find and print the maximum temperature
print(max(temps))`
            ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const n = parseInt(lines[0]);
const temps = lines[1].split(' ').map(Number);

// Find and print the maximum temperature
console.log(Math.max(...temps));`
            },
            solutionCode: { python: `n=int(input()); a=list(map(int,input().split())); print(max(a))` },
            testCases: [
              { input: "5\n23 41 18 55 32", expectedOutput: "55" },
              { input: "3\n-5 -1 -10", expectedOutput: "-1" },
              { input: "1\n42", expectedOutput: "42" },
              { input: "4\n10 10 10 10", expectedOutput: "10" },
              { input: "6\n0 100 -100 50 75 25", expectedOutput: "100" }
            ]
          },
          {
            id: "arr-code-3",
            title: "Bank Transaction Sum",
            difficulty: "Easy",
            scenario: "🏦 A bank's transaction processor needs to compute the NET balance from a list of transactions (positive = credit, negative = debit). Calculate the sum of all transactions.",
            description: "Return the sum of all N integers in the array.",
            constraints: "1 ≤ N ≤ 10^5 | -10^6 ≤ arr[i] ≤ 10^6",
            starterCode: {
              python: `n = int(input())
arr = list(map(int, input().split()))
print(sum(arr))`
            ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const n = parseInt(lines[0]);
const arr = lines[1].split(' ').map(Number);

// Print the sum
console.log(arr.reduce((a, b) => a + b, 0));`
            },
            solutionCode: { python: `n=int(input()); print(sum(map(int,input().split())))` },
            testCases: [
              { input: "5\n100 -50 200 -30 80", expectedOutput: "300" },
              { input: "3\n-100 -200 -50", expectedOutput: "-350" },
              { input: "1\n0", expectedOutput: "0" },
              { input: "4\n1000000 1000000 -1000000 -999999", expectedOutput: "1" },
              { input: "3\n10 20 30", expectedOutput: "60" }
            ]
          },
          {
            id: "arr-code-4",
            title: "Inventory Rotation — Reverse Array",
            difficulty: "Easy",
            scenario: "🏭 A warehouse uses LIFO (Last-In-First-Out) for perishables. Items are stored in order of arrival. Print items in REVERSE order (most recent first) without using extra arrays.",
            description: "Print array elements in reverse order.",
            constraints: "1 ≤ N ≤ 10^5",
            starterCode: {
              python: `n = int(input())
arr = list(map(int, input().split()))
arr.reverse()
print(*arr)`
            ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const n = parseInt(lines[0]);
const arr = lines[1].split(' ').map(Number);

// Print array reversed
console.log(arr.reverse().join(' '));`
            },
            solutionCode: { python: `n=int(input()); a=list(map(int,input().split())); print(*a[::-1])` },
            testCases: [
              { input: "5\n1 2 3 4 5", expectedOutput: "5 4 3 2 1" },
              { input: "3\n10 20 30", expectedOutput: "30 20 10" },
              { input: "1\n42", expectedOutput: "42" },
              { input: "4\n100 200 300 400", expectedOutput: "400 300 200 100" },
              { input: "2\n7 3", expectedOutput: "3 7" }
            ]
          },
          {
            id: "arr-code-5",
            title: "Exam Score Second Topper",
            difficulty: "Medium",
            scenario: "🎓 A university's academic system needs to identify the SECOND HIGHEST scorer to award a consolation prize. All scores may not be distinct. Find the second largest distinct score.",
            description: "Find the second largest element (strict second — not equal to max). If no second largest exists, print -1.",
            constraints: "2 ≤ N ≤ 10^5 | 1 ≤ scores[i] ≤ 1000",
            starterCode: {
              python: `n = int(input())
scores = list(map(int, input().split()))
unique = sorted(set(scores), reverse=True)
print(unique[1] if len(unique) >= 2 else -1)`
            ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const n = parseInt(lines[0]);
const scores = [...new Set(lines[1].split(' ').map(Number))].sort((a, b) => b - a);

console.log(scores.length >= 2 ? scores[1] : -1);`
            },
            solutionCode: { python: `n=int(input()); a=sorted(set(map(int,input().split())),reverse=True); print(a[1] if len(a)>=2 else -1)` },
            testCases: [
              { input: "6\n12 35 1 10 34 1", expectedOutput: "34" },
              { input: "4\n10 10 10 10", expectedOutput: "-1" },
              { input: "3\n5 3 8", expectedOutput: "5" },
              { input: "2\n100 1", expectedOutput: "1" },
              { input: "5\n9 9 8 7 6", expectedOutput: "8" }
            ]
          }
        ],

        jumbledCode: [
          {
            id: "arr-jumb-1",
            title: "Arrange: Two-Pointer Sum Check",
            description: "Arrange these lines to correctly check if any two elements in a sorted array sum to target T.",
            language: "python",
            lines: [
              "print('YES' if found else 'NO')",
              "r = n - 1",
              "n, t = map(int, input().split())",
              "while l < r:",
              "    elif arr[l] + arr[r] < t: l += 1",
              "found = False",
              "arr = list(map(int, input().split()))",
              "    if arr[l] + arr[r] == t: found = True; break",
              "l = 0",
              "    else: r -= 1"
            ],
            correctOrder: [2, 6, 5, 8, 1, 3, 7, 4, 9, 0],
            hint: "Initialize array and pointers first, then loop"
          },
          {
            id: "arr-jumb-2",
            title: "Arrange: Find Maximum",
            description: "Put these lines in correct order to find the maximum element.",
            language: "python",
            lines: [
              "for x in arr:",
              "n = int(input())",
              "arr = list(map(int, input().split()))",
              "    if x > max_val: max_val = x",
              "print(max_val)",
              "max_val = arr[0]"
            ],
            correctOrder: [1, 2, 5, 0, 3, 4],
            hint: "Read input, initialize max with first element, then scan"
          },
          {
            id: "arr-jumb-3",
            title: "Arrange: Reverse In-Place (C)",
            description: "Arrange C code lines to reverse an array in-place using two pointers.",
            language: "c",
            lines: [
              "int l = 0, r = n - 1;",
              "while(l < r) {",
              "    int temp = arr[l]; arr[l] = arr[r]; arr[r] = temp;",
              "    l++; r--;",
              "}"
            ],
            correctOrder: [0, 1, 2, 3, 4],
            hint: "Set pointers, loop while they don't cross, swap then advance"
          },
          {
            id: "arr-jumb-4",
            title: "Arrange: Count Negative Numbers",
            description: "Arrange lines to count how many negative numbers are in the array.",
            language: "python",
            lines: [
              "count = 0",
              "n = int(input())",
              "arr = list(map(int, input().split()))",
              "print(count)",
              "for x in arr:",
              "    if x < 0: count += 1"
            ],
            correctOrder: [1, 2, 0, 4, 5, 3],
            hint: "Read → initialize counter → loop → print"
          },
          {
            id: "arr-jumb-5",
            title: "Arrange: Rotate Array Left by K",
            description: "Arrange Python lines to rotate array left by K positions.",
            language: "python",
            lines: [
              "k = int(input())",
              "n = int(input())",
              "arr = list(map(int, input().split()))",
              "rotated = arr[k:] + arr[:k]",
              "print(*rotated)"
            ],
            correctOrder: [1, 2, 0, 3, 4],
            hint: "Read n, then array, then k; slice to rotate"
          }
        ],

        missingCode: [
          {
            id: "arr-miss-1",
            title: "Complete: Linear Search",
            description: "A shopping app searches for a product ID. Complete the linear search.",
            language: "python",
            template: `n, target = map(int, input().split())
arr = list(map(int, input().split()))
result = ____
for i in range(____):
    if arr[i] == ____:
        result = i
        ____
print(result)`,
            blanks: ["-1", "n", "target", "break"],
            hints: [
              "Default return value when not found",
              "Loop range is array length",
              "Compare current element to what we search",
              "Stop as soon as found"
            ]
          },
          {
            id: "arr-miss-2",
            title: "Complete: Counting Occurrences",
            description: "Count how many times a value X appears in the array.",
            language: "python",
            template: `n, x = map(int, input().split())
arr = list(map(int, input().split()))
count = ____
for val in arr:
    if val == ____:
        count ____ 1
print(____)`,
            blanks: ["0", "x", "+=", "count"],
            hints: ["Start counter at zero", "Compare to target value", "Increment operator", "Print the counter"]
          },
          {
            id: "arr-miss-3",
            title: "Complete: Two-Pointer Reverse",
            description: "Reverse array in-place using two pointers.",
            language: "c",
            template: `int l = ____, r = n - 1;
while(____ < r) {
    int temp = arr[____];
    arr[l] = arr[r];
    arr[r] = ____;
    l++; r--;
}`,
            blanks: ["0", "l", "l", "temp"],
            hints: ["Left pointer starts at beginning", "Loop while pointers haven't crossed", "Save left element to temp", "Place saved value at right"]
          },
          {
            id: "arr-miss-4",
            title: "Complete: Prefix Sum",
            description: "Build prefix sum array where prefix[i] = sum of arr[0..i].",
            language: "python",
            template: `prefix = [____] * n
prefix[0] = arr[0]
for i in range(1, ____):
    prefix[i] = prefix[____] + arr[i]
print(*prefix)`,
            blanks: ["0", "n", "i-1"],
            hints: ["Initialize with zeros", "Loop from 1 to n", "Previous prefix sum index"]
          },
          {
            id: "arr-miss-5",
            title: "Complete: Move Zeros to End",
            description: "Move all zeros to end, preserve order of non-zeros.",
            language: "python",
            template: `result = [x for x in arr if x ____ 0]
result += [0] * (____ - len(result))
print(*result)`,
            blanks: ["!=", "n"],
            hints: ["Collect non-zero elements", "Pad with zeros to original length"]
          }
        ],

        optimize: [
          {
            id: "arr-opt-1",
            title: "Optimize: Duplicate Detection",
            scenario: "🔍 A fraud detection system scans millions of transactions for duplicate IDs. Current implementation is too slow.",
            badCode: `# O(N²) — TLE for large input
for i in range(n):
    for j in range(i+1, n):
        if arr[i] == arr[j]:
            return True
return False`,
            goodCode: `# O(N) — hash set approach
seen = set()
for x in arr:
    if x in seen: return True
    seen.add(x)
return False`,
            currentComplexity: "O(N²) time, O(1) space",
            optimalComplexity: "O(N) time, O(N) space",
            explanation: "Trading space for time: hash set gives O(1) lookups instead of re-scanning array.",
            question: "What is the space tradeoff in the optimized solution?",
            questionAnswer: "O(N) extra space for the hash set — acceptable to reduce time from O(N²) to O(N)"
          },
          {
            id: "arr-opt-2",
            title: "Optimize: Finding Pair with Target Sum",
            scenario: "💑 A matchmaking app pairs users by compatibility score sum = target. Slow solution times out with 100k users.",
            badCode: `# O(N²)
for i in range(n):
    for j in range(i+1, n):
        if arr[i]+arr[j] == target:
            print(i, j); return`,
            goodCode: `# O(N) — complement hash map
seen = {}
for i, x in enumerate(arr):
    if target-x in seen:
        print(seen[target-x], i); return
    seen[x] = i`,
            currentComplexity: "O(N²)",
            optimalComplexity: "O(N)",
            explanation: "For each element, check if its complement (target - element) was already seen.",
            question: "Why can't we use binary search here on unsorted input?",
            questionAnswer: "Binary search requires sorted array. Sorting costs O(N log N) and loses original indices."
          },
          {
            id: "arr-opt-3",
            title: "Optimize: Subarray Sum = K",
            scenario: "💰 A payroll system needs to find contiguous employee bonuses summing exactly to budget K.",
            badCode: `# O(N²) — all subarrays
for i in range(n):
    total = 0
    for j in range(i, n):
        total += arr[j]
        if total == k: count += 1`,
            goodCode: `# O(N) — prefix sum + hash map
prefix = {0: 1}
total = count = 0
for x in arr:
    total += x
    count += prefix.get(total - k, 0)
    prefix[total] = prefix.get(total, 0) + 1`,
            currentComplexity: "O(N²)",
            optimalComplexity: "O(N)",
            explanation: "prefix[total-k] tells us how many subarrays ending here sum to K.",
            question: "Why do we initialize prefix = {0: 1}?",
            questionAnswer: "To handle subarrays starting from index 0 — if total == k, then total-k=0 should count as 1 existing prefix."
          },
          {
            id: "arr-opt-4",
            title: "Optimize: Majority Element",
            scenario: "🗳️ An election system needs to find the candidate who got more than N/2 votes.",
            badCode: `# O(N) time, O(N) space
from collections import Counter
counts = Counter(arr)
for x, c in counts.items():
    if c > n//2: return x`,
            goodCode: `# O(N) time, O(1) space — Boyer-Moore Voting
candidate, count = arr[0], 1
for x in arr[1:]:
    if count == 0: candidate, count = x, 1
    elif x == candidate: count += 1
    else: count -= 1
return candidate`,
            currentComplexity: "O(N) time, O(N) space",
            optimalComplexity: "O(N) time, O(1) space",
            explanation: "Boyer-Moore Voting eliminates need for hash map — constant space.",
            question: "Does Boyer-Moore guarantee finding majority even if majority element doesn't exist?",
            questionAnswer: "No — it finds the CANDIDATE. You must verify it appears > N/2 times in a second pass."
          },
          {
            id: "arr-opt-5",
            title: "Optimize: Maximum Subarray Sum",
            scenario: "📈 A stock trading algorithm needs the maximum profit window from price change array.",
            badCode: `# O(N²)
max_sum = arr[0]
for i in range(n):
    total = 0
    for j in range(i, n):
        total += arr[j]
        max_sum = max(max_sum, total)`,
            goodCode: `# O(N) — Kadane's Algorithm
max_sum = curr = arr[0]
for x in arr[1:]:
    curr = max(x, curr + x)
    max_sum = max(max_sum, curr)`,
            currentComplexity: "O(N²)",
            optimalComplexity: "O(N)",
            explanation: "Kadane's: extend subarray if beneficial, else start fresh from current element.",
            question: "When does Kadane's algorithm start a new subarray?",
            questionAnswer: "When adding current element to existing subarray gives less than starting fresh (curr + x < x, i.e., curr < 0)"
          }
        ]
      },

      "2D Arrays / Matrix": {
        objective: [
          { id: "mat-obj-1", question: "A chess app stores board state in an 8×8 2D array. To access element at row 3, column 5 (0-indexed), the expression is:", options: ["board[5][3]", "board[3][5]", "board[8][8]", "board[35]"], answer: 1, explanation: "2D arrays are indexed as [row][col]. Row 3, column 5 → board[3][5]." },
          { id: "mat-obj-2", question: "Rotating a matrix 90° clockwise — what is element at position [i][j] mapped to?", options: ["[j][i]", "[N-1-j][i]", "[i][N-1-j]", "[N-1-i][j]"], answer: 1, explanation: "90° clockwise: new_matrix[j][N-1-i] = old[i][j], equivalently old[i][j] goes to [j][N-1-i]." },
          { id: "mat-obj-3", question: "Traversing an M×N matrix — what is the time complexity?", options: ["O(M+N)", "O(M×N)", "O(M²)", "O(N²)"], answer: 1, explanation: "Must visit every cell once → O(M×N)." },
          { id: "mat-obj-4", question: "In a spiral matrix traversal, the order of direction traversal is:", options: ["Up → Right → Down → Left", "Right → Down → Left → Up", "Left → Down → Right → Up", "Down → Left → Up → Right"], answer: 1, explanation: "Standard spiral: go Right, then Down, then Left, then Up, shrinking boundaries." },
          { id: "mat-obj-5", question: "Searching for a target in a row-sorted, column-sorted matrix — best time complexity?", options: ["O(M×N)", "O(M+N)", "O(log M + log N)", "O(M log N)"], answer: 1, explanation: "Start from top-right: if target < current, move left; if target > current, move down → O(M+N)." }
        ],
        codeEditor: [
          { id: "mat-code-1", title: "Matrix Diagonal Sum", difficulty: "Easy", scenario: "🔢 A game app uses an N×N grid. Calculate the sum of both primary and secondary diagonals (don't double-count center for odd N).", description: "Given N×N matrix, return sum of primary + secondary diagonal elements.", constraints: "1 ≤ N ≤ 100", starterCode: { python: `n = int(input())
matrix = [list(map(int, input().split())) for _ in range(n)]
total = 0
for i in range(n):
    total += matrix[i][i]           # primary diagonal
    if i != n-1-i:                  # avoid double-counting center
        total += matrix[i][n-1-i]   # secondary diagonal
print(total)` ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const n = parseInt(lines[0]);
const matrix = [];
for (let i = 0; i < n; i++) {
  matrix.push(lines[i + 1].split(' ').map(Number));
}

let total = 0;
for (let i = 0; i < n; i++) {
  total += matrix[i][i];
  if (i !== n - 1 - i) total += matrix[i][n - 1 - i];
}
console.log(total);`
            }, solutionCode: { python: `n=int(input());m=[list(map(int,input().split()))for _ in range(n)];print(sum(m[i][i]+m[i][n-1-i] for i in range(n)) - (m[n//2][n//2] if n%2 else 0))` }, testCases: [{ input: "3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "25" }, { input: "2\n1 2\n3 4", expectedOutput: "10" }, { input: "1\n5", expectedOutput: "5" }, { input: "4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16", expectedOutput: "68" }, { input: "3\n5 5 5\n5 5 5\n5 5 5", expectedOutput: "25" }] },
          { id: "mat-code-2", title: "Transpose Matrix", difficulty: "Easy", scenario: "📊 A data analytics tool needs to transpose a dataset matrix (swap rows and columns).", description: "Given N×N matrix, print its transpose.", constraints: "1 ≤ N ≤ 100", starterCode: { python: `n = int(input())
matrix = [list(map(int, input().split())) for _ in range(n)]
for j in range(n):
    print(*[matrix[i][j] for i in range(n)])` ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const n = parseInt(lines[0]);
const matrix = [];
for (let i = 0; i < n; i++) {
  matrix.push(lines[i + 1].split(' ').map(Number));
}

for (let j = 0; j < n; j++) {
  console.log(matrix.map(row => row[j]).join(' '));
}`
            }, solutionCode: { python: `n=int(input());m=[list(map(int,input().split()))for _ in range(n)]` + "\n" + `for j in range(n): print(*[m[i][j] for i in range(n)])` }, testCases: [{ input: "3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "1 4 7\n2 5 8\n3 6 9" }, { input: "2\n1 2\n3 4", expectedOutput: "1 3\n2 4" }, { input: "1\n7", expectedOutput: "7" }, { input: "3\n0 0 0\n1 1 1\n2 2 2", expectedOutput: "0 1 2\n0 1 2\n0 1 2" }, { input: "2\n5 10\n15 20", expectedOutput: "5 15\n10 20" }] },
          { id: "mat-code-3", title: "Row With Maximum Ones", difficulty: "Medium", scenario: "📡 A satellite grid map stores binary terrain data. Find the row index with the most 1s (first occurrence if tie).", description: "Given N×M binary matrix, return 0-indexed row with maximum 1s.", constraints: "1 ≤ N,M ≤ 1000", starterCode: { python: `n, m = map(int, input().split())
best_row, best_count = 0, -1
for i in range(n):
    row = list(map(int, input().split()))
    cnt = sum(row)
    if cnt > best_count:
        best_count = cnt
        best_row = i
print(best_row)` ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const [n, m] = lines[0].split(' ').map(Number);
let bestRow = 0, bestCount = -1;
for (let i = 0; i < n; i++) {
  const cnt = lines[i + 1].split(' ').map(Number).filter(x => x === 1).length;
  if (cnt > bestCount) { bestCount = cnt; bestRow = i; }
}
console.log(bestRow);`
            }, solutionCode: { python: `n,m=map(int,input().split());best,bc=0,-1
for i in range(n):
    c=sum(map(int,input().split()))
    if c>bc: bc=c;best=i
print(best)` }, testCases: [{ input: "3 4\n0 1 1 0\n1 1 1 1\n0 0 1 0", expectedOutput: "1" }, { input: "2 3\n0 0 0\n0 0 0", expectedOutput: "0" }, { input: "3 3\n1 1 1\n1 1 0\n1 1 1", expectedOutput: "0" }, { input: "1 4\n1 0 1 0", expectedOutput: "0" }, { input: "3 3\n0 1 0\n1 1 1\n0 1 0", expectedOutput: "1" }] },
          { id: "mat-code-4", title: "Rotate Matrix 90° Clockwise", difficulty: "Hard", scenario: "🎮 A tile-based game engine needs to rotate puzzle grids 90° clockwise in-place.", description: "Rotate N×N matrix 90° clockwise in-place.", constraints: "1 ≤ N ≤ 100", starterCode: { python: `n = int(input())
matrix = [list(map(int, input().split())) for _ in range(n)]
# Transpose then reverse each row
for i in range(n):
    for j in range(i+1, n):
        matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
for row in matrix:
    row.reverse()
    print(*row)` ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const n = parseInt(lines[0]);
const matrix = [];
for (let i = 0; i < n; i++) {
  matrix.push(lines[i + 1].split(' ').map(Number));
}

// Transpose then reverse each row → 90° clockwise
for (let i = 0; i < n; i++)
  for (let j = i + 1; j < n; j++)
    [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];

for (const row of matrix) {
  row.reverse();
  console.log(row.join(' '));
}`
            }, solutionCode: { python: `n=int(input());m=[list(map(int,input().split()))for _ in range(n)]
for i in range(n):
    for j in range(i+1,n): m[i][j],m[j][i]=m[j][i],m[i][j]
for r in m: r.reverse(); print(*r)` }, testCases: [{ input: "3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "7 4 1\n8 5 2\n9 6 3" }, { input: "2\n1 2\n3 4", expectedOutput: "3 1\n4 2" }, { input: "1\n5", expectedOutput: "5" }, { input: "3\n0 0 1\n0 1 0\n1 0 0", expectedOutput: "1 0 0\n0 1 0\n0 0 1" }, { input: "4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16", expectedOutput: "13 9 5 1\n14 10 6 2\n15 11 7 3\n16 12 8 4" }] },
          { id: "mat-code-5", title: "Set Matrix Zeros", difficulty: "Medium", scenario: "🗺️ A map application marks blocked zones: if any cell is 0 (blocked), set entire row and column to 0.", description: "If matrix[i][j]==0, set entire row i and column j to 0.", constraints: "1 ≤ M,N ≤ 300", starterCode: { python: `m, n = map(int, input().split())
matrix = [list(map(int, input().split())) for _ in range(m)]
rows, cols = set(), set()
for i in range(m):
    for j in range(n):
        if matrix[i][j] == 0:
            rows.add(i); cols.add(j)
for i in range(m):
    for j in range(n):
        if i in rows or j in cols:
            matrix[i][j] = 0
for row in matrix:
    print(*row)` ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const [m, n] = lines[0].split(' ').map(Number);
const mat = [];
for (let i = 0; i < m; i++) mat.push(lines[i + 1].split(' ').map(Number));

const rows = new Set(), cols = new Set();
for (let i = 0; i < m; i++)
  for (let j = 0; j < n; j++)
    if (mat[i][j] === 0) { rows.add(i); cols.add(j); }

for (let i = 0; i < m; i++) {
  const row = [];
  for (let j = 0; j < n; j++)
    row.push(rows.has(i) || cols.has(j) ? 0 : mat[i][j]);
  console.log(row.join(' '));
}`
            }, solutionCode: { python: `m,n=map(int,input().split());mat=[list(map(int,input().split()))for _ in range(m)];r=set();c=set()
for i in range(m):
    for j in range(n):
        if mat[i][j]==0: r.add(i);c.add(j)
for i in range(m):
    for j in range(n):
        if i in r or j in c: mat[i][j]=0
for row in mat: print(*row)` }, testCases: [{ input: "3 3\n1 1 1\n1 0 1\n1 1 1", expectedOutput: "1 0 1\n0 0 0\n1 0 1" }, { input: "2 3\n0 1 2\n3 4 5", expectedOutput: "0 0 0\n0 4 5" }, { input: "1 1\n0", expectedOutput: "0" }, { input: "2 2\n1 1\n1 1", expectedOutput: "1 1\n1 1" }, { input: "3 4\n1 2 0 4\n5 6 7 8\n9 0 11 12", expectedOutput: "1 0 0 4\n0 0 0 0\n0 0 0 0" }] }
        ],

        jumbledCode: [
          { id: "mat-jumb-1", title: "Arrange: Print Boundary Elements", description: "Print all boundary (border) elements of a matrix.", language: "python", lines: ["for j in range(m):", "n, m = map(int, input().split())", "    print(matrix[0][j], end=' ')", "matrix = [list(map(int, input().split())) for _ in range(n)]", "for i in range(1, n-1): print(matrix[i][0], matrix[i][m-1])", "    print(matrix[n-1][j], end=' ')"], correctOrder: [1, 3, 0, 2, 4, 5], hint: "Read matrix, then print top row, middle rows' edges, bottom row" },
          { id: "mat-jumb-2", title: "Arrange: Count Zeros in Matrix", description: "Count total number of zeros in a matrix.", language: "python", lines: ["count = 0", "n, m = map(int, input().split())", "print(count)", "matrix = [list(map(int, input().split())) for _ in range(n)]", "for row in matrix:", "    for val in row:", "        if val == 0: count += 1"], correctOrder: [1, 3, 0, 4, 5, 6, 2], hint: "Initialize counter, nested loop, increment on zero" },
          { id: "mat-jumb-3", title: "Arrange: Matrix Addition", description: "Add two matrices element-wise.", language: "python", lines: ["for i in range(n):", "b = [list(map(int,input().split())) for _ in range(n)]", "n = int(input())", "a = [list(map(int,input().split())) for _ in range(n)]", "    print(*[a[i][j]+b[i][j] for j in range(n)])"], correctOrder: [2, 3, 1, 0, 4], hint: "Read n, then both matrices, then print sums" },
          { id: "mat-jumb-4", title: "Arrange: Check Symmetric Matrix", description: "Check if matrix equals its transpose.", language: "python", lines: ["flag = True", "for i in range(n):", "n = int(input())", "    for j in range(n):", "matrix = [list(map(int,input().split())) for _ in range(n)]", "print('YES' if flag else 'NO')", "        if matrix[i][j] != matrix[j][i]: flag = False"], correctOrder: [2, 4, 0, 1, 3, 6, 5], hint: "Check all pairs (i,j) vs (j,i)" },
          { id: "mat-jumb-5", title: "Arrange: Row-wise Max", description: "Print maximum element of each row.", language: "python", lines: ["n, m = map(int, input().split())", "for row in matrix:", "    print(max(row))", "matrix = [list(map(int,input().split())) for _ in range(n)]"], correctOrder: [0, 3, 1, 2], hint: "Read, then iterate rows printing max" }
        ],

        missingCode: [
          { id: "mat-miss-1", title: "Complete: Spiral Order Print", description: "Complete spiral matrix traversal.", language: "python", template: `top, bottom, left, right = 0, n-1, 0, m-1
while top <= ____ and left <= ____:
    for j in range(left, right+1): print(matrix[top][j], end=' ')
    ____+= 1
    for i in range(top, bottom+1): print(matrix[i][right], end=' ')
    right -= ____`, blanks: ["bottom", "right", "top", "1"], hints: ["Loop condition uses bottom", "Loop condition uses right", "After top row, move top down", "Move right boundary inward"] },
          { id: "mat-miss-2", title: "Complete: Column Sum", description: "Print sum of each column.", language: "python", template: `for j in range(____):
    col_sum = ____
    for i in range(n):
        col_sum += matrix[____][____]
    print(col_sum)`, blanks: ["m", "0", "i", "j"], hints: ["Iterate over columns", "Start sum at zero", "Row index in inner loop", "Column index"] },
          { id: "mat-miss-3", title: "Complete: Identity Matrix Check", description: "Check if given matrix is an identity matrix.", language: "python", template: `flag = True
for i in range(n):
    for j in range(n):
        if i == j and matrix[i][j] != ____: flag = False
        if i != j and matrix[i][j] != ____: flag = False
print('YES' if ____ else 'NO')`, blanks: ["1", "0", "flag"], hints: ["Diagonal must be 1", "Off-diagonal must be 0", "Print result"] },
          { id: "mat-miss-4", title: "Complete: Find Saddle Point", description: "Find element that is min in its row and max in its column.", language: "python", template: `for i in range(n):
    row_min = min(matrix[____])
    for j in range(n):
        if matrix[i][j] == row_min:
            col_max = max(matrix[k][j] for k in range(____))
            if matrix[i][j] == ____:
                print(i, j); found = True`, blanks: ["i", "n", "col_max"], hints: ["Row index for min", "Column range", "Compare to column max"] },
          { id: "mat-miss-5", title: "Complete: Matrix Power Check", description: "Check if all elements in matrix are perfect squares.", language: "python", template: `import math
flag = True
for row in matrix:
    for val in ____:
        root = int(math.sqrt(____))
        if root * ____ != val: flag = False
print(flag)`, blanks: ["row", "val", "root"], hints: ["Iterate over row elements", "Take sqrt of value", "Square root squared"] }
        ],

        optimize: [
          { id: "mat-opt-1", title: "Optimize: Search in Sorted Matrix", scenario: "📊 Search target in row/col sorted matrix.", badCode: `# O(M×N)
for i in range(m):
    for j in range(n):
        if matrix[i][j] == target: return True
return False`, goodCode: `# O(M+N) — top-right corner approach
r, c = 0, n-1
while r < m and c >= 0:
    if matrix[r][c] == target: return True
    elif matrix[r][c] > target: c -= 1
    else: r += 1
return False`, currentComplexity: "O(M×N)", optimalComplexity: "O(M+N)", explanation: "Start from top-right: each step eliminates a row or column.", question: "Why top-right corner?", questionAnswer: "It's the unique position where we can definitively go left (smaller) or down (larger)." },
          { id: "mat-opt-2", title: "Optimize: Spiral Order", scenario: "🌀 Print matrix in spiral — avoid complex conditionals.", badCode: `# Complex direction array approach
while count < m*n:
    # track direction, boundaries separately...`, goodCode: `# Clean boundary shrinking
while top<=bottom and left<=right:
    for j in range(left,right+1): print(mat[top][j])
    top+=1
    # ... shrink boundaries`, currentComplexity: "O(M×N) with high constant", optimalComplexity: "O(M×N) clean O(1) extra", explanation: "Boundary approach avoids direction tracking overhead.", question: "How many boundary variables do we need?", questionAnswer: "4: top, bottom, left, right" },
          { id: "mat-opt-3", title: "Optimize: Matrix Chain Multiply", scenario: "🔢 Minimize cost of multiplying chain of matrices.", badCode: `# No memoization — exponential
def cost(i, j):
    if i == j: return 0
    return min(cost(i,k)+cost(k+1,j)+p[i]*p[k+1]*p[j+1]
               for k in range(i,j))`, goodCode: `# DP with memoization — O(N³)
dp = [[0]*n for _ in range(n)]
for l in range(2, n):
    for i in range(n-l):
        j = i+l; dp[i][j] = float('inf')
        for k in range(i, j):
            dp[i][j] = min(dp[i][j], dp[i][k]+dp[k+1][j]+p[i]*p[k+1]*p[j+1])`, currentComplexity: "Exponential", optimalComplexity: "O(N³)", explanation: "Overlapping subproblems → memoize with DP table.", question: "What is the number of distinct subproblems?", questionAnswer: "O(N²) — all (i,j) pairs" },
          { id: "mat-opt-4", title: "Optimize: Largest Rectangle in Histogram", scenario: "🏙️ Find largest rectangle area in histogram (building skyline problem).", badCode: `# O(N²)
for i in range(n):
    min_h = heights[i]
    for j in range(i, n):
        min_h = min(min_h, heights[j])
        max_area = max(max_area, min_h*(j-i+1))`, goodCode: `# O(N) — monotonic stack
stack = []; max_area = 0
for i, h in enumerate(heights+[0]):
    while stack and heights[stack[-1]] >= h:
        height = heights[stack.pop()]
        width = i if not stack else i-stack[-1]-1
        max_area = max(max_area, height*width)
    stack.append(i)`, currentComplexity: "O(N²)", optimalComplexity: "O(N)", explanation: "Monotonic stack tracks potential left boundaries efficiently.", question: "What does the zero appended to heights do?", questionAnswer: "Forces all remaining stack elements to be processed at the end." },
          { id: "mat-opt-5", title: "Optimize: Island Count", scenario: "🏝️ Count islands in binary matrix (connected 1s).", badCode: `# O(M×N) but creates copy of entire matrix
import copy
def dfs(grid, i, j):
    # marks visited by setting to 0 in copy
    ...
grid_copy = copy.deepcopy(grid)  # O(M×N) extra space`, goodCode: `# O(M×N) time, O(1) extra space — modify in-place
def dfs(grid, i, j):
    if i<0 or i>=m or j<0 or j>=n or grid[i][j]!='1': return
    grid[i][j] = '0'  # mark visited in-place
    for di,dj in [(0,1),(0,-1),(1,0),(-1,0)]:
        dfs(grid, i+di, j+dj)`, currentComplexity: "O(M×N) time, O(M×N) extra space", optimalComplexity: "O(M×N) time, O(1) extra space", explanation: "Mark visited cells in-place instead of copying grid.", question: "What is the recursion stack space complexity?", questionAnswer: "O(M×N) worst case for the DFS call stack on a full grid of 1s." }
        ]
      }
    }
  },

  // ═══════════════════════════════════════════════════════════
  //  TOPIC: STRINGS
  // ═══════════════════════════════════════════════════════════
  Strings: {
    topicIcon: "🔤",
    topicColor: "#10b981",
    subtopics: {
      "String Basics": {
        objective: [
          { id: "str-obj-1", question: "A password validator checks if string contains only alphanumeric chars. The efficient approach uses:", options: ["Nested loops", "char.isalnum() in O(N)", "Two pointer O(N)", "Both B and C are O(N)"], answer: 3, explanation: "Both single-pass approaches are O(N). isalnum() checks each char once." },
          { id: "str-obj-2", question: "String concatenation 's += char' in a loop for N chars has complexity:", options: ["O(N)", "O(N log N)", "O(N²)", "O(1) per operation"], answer: 2, explanation: "Each += creates a new string → copies grow linearly → total O(N²). Use list.join() instead." },
          { id: "str-obj-3", question: "Finding all occurrences of pattern P in text T (lengths M and N) — naive approach:", options: ["O(N)", "O(M)", "O(N×M)", "O(N+M)"], answer: 2, explanation: "For each of N positions in T, check M chars of P → O(N×M). KMP does it in O(N+M)." },
          { id: "str-obj-4", question: "Which data structure best finds the longest repeated substring?", options: ["Hash table", "Suffix array", "Stack", "Queue"], answer: 1, explanation: "Suffix arrays store all suffixes sorted → common prefixes find repeated substrings in O(N log N)." },
          { id: "str-obj-5", question: "Anagram check for two strings of length N — optimal approach:", options: ["Sort both O(N log N)", "Count chars O(N)", "Bit manipulation O(N)", "Two pointer O(N²)"], answer: 1, explanation: "Character frequency counting takes O(N) time and O(1) space (fixed 26-char alphabet)." }
        ],
        codeEditor: [
          { id: "str-code-1", title: "Username Validator", difficulty: "Easy", scenario: "👤 A social platform validates usernames: must be 3–20 chars, start with letter, contain only letters/digits/underscore. Check if given username is valid.", description: "Return VALID or INVALID based on username rules.", constraints: "1 ≤ |s| ≤ 100", starterCode: { python: `import re
username = input()
if re.match(r'^[A-Za-z][A-Za-z0-9_]{2,19}$', username):
    print("VALID")
else:
    print("INVALID")` ,
              javascript: `const username = require('fs').readFileSync('/dev/stdin','utf8').trim();
console.log(/^[A-Za-z][A-Za-z0-9_]{2,19}$/.test(username) ? 'VALID' : 'INVALID');`
            }, solutionCode: { python: `import re; u=input(); print("VALID" if re.match(r'^[A-Za-z][A-Za-z0-9_]{2,19}$',u) else "INVALID")` }, testCases: [{ input: "john_doe", expectedOutput: "VALID" }, { input: "a", expectedOutput: "INVALID" }, { input: "1start", expectedOutput: "INVALID" }, { input: "valid_User123", expectedOutput: "VALID" }, { input: "has space", expectedOutput: "INVALID" }] },
          { id: "str-code-2", title: "Word Frequency Counter", difficulty: "Medium", scenario: "📰 A news analytics app counts word frequencies in articles. Given a sentence, count occurrences of each word (case-insensitive), sorted alphabetically.", description: "Print each word and its count, sorted by word.", constraints: "1 ≤ sentence length ≤ 10^4", starterCode: { python: `from collections import Counter
sentence = input().lower().split()
count = Counter(sentence)
for word in sorted(count):
    print(f"{word} {count[word]}")` ,
              javascript: `const sentence = require('fs').readFileSync('/dev/stdin','utf8').trim().toLowerCase().split(/\s+/);
const freq = {};
for (const w of sentence) freq[w] = (freq[w] || 0) + 1;
for (const w of Object.keys(freq).sort()) console.log(w + ' ' + freq[w]);`
            }, solutionCode: { python: `from collections import Counter; s=input().lower().split(); c=Counter(s)
for w in sorted(c): print(w, c[w])` }, testCases: [{ input: "the cat sat on the mat the cat", expectedOutput: "cat 2\nmat 1\non 1\nsat 1\nthe 3" }, { input: "hello world hello", expectedOutput: "hello 2\nworld 1" }, { input: "one", expectedOutput: "one 1" }, { input: "a b c a b a", expectedOutput: "a 3\nb 2\nc 1" }, { input: "apple Apple APPLE", expectedOutput: "apple 3" }] },
          { id: "str-code-3", title: "Palindrome Checker", difficulty: "Easy", scenario: "🔄 A messaging app has an easter egg: detects palindrome messages. Check if input string (ignoring spaces and case) is a palindrome.", description: "Print YES if palindrome else NO (ignore spaces and case).", constraints: "1 ≤ |s| ≤ 10^5", starterCode: { python: `s = ''.join(input().lower().split())
print("YES" if s == s[::-1] else "NO")` ,
              javascript: `const s = require('fs').readFileSync('/dev/stdin','utf8').trim().toLowerCase().replace(/\s+/g,'');
console.log(s === s.split('').reverse().join('') ? 'YES' : 'NO');`
            }, solutionCode: { python: `s=''.join(input().lower().split()); print("YES" if s==s[::-1] else "NO")` }, testCases: [{ input: "racecar", expectedOutput: "YES" }, { input: "hello", expectedOutput: "NO" }, { input: "A man a plan a canal Panama", expectedOutput: "YES" }, { input: "Never odd or even", expectedOutput: "YES" }, { input: "Not a palindrome", expectedOutput: "NO" }] },
          { id: "str-code-4", title: "Anagram Groups", difficulty: "Medium", scenario: "🔡 A spelling game groups words that are anagrams of each other. Given N words, print groups of anagrams (sorted within group and between groups).", description: "Group anagrams together, print each group sorted.", constraints: "1 ≤ N ≤ 1000", starterCode: { python: `from collections import defaultdict
n = int(input())
groups = defaultdict(list)
for _ in range(n):
    word = input()
    key = ''.join(sorted(word))
    groups[key].append(word)
for key in sorted(groups):
    print(' '.join(sorted(groups[key])))` ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const n = parseInt(lines[0]);
const groups = {};
for (let i = 1; i <= n; i++) {
  const w = lines[i];
  const key = w.split('').sort().join('');
  if (!groups[key]) groups[key] = [];
  groups[key].push(w);
}
for (const key of Object.keys(groups).sort())
  console.log(groups[key].sort().join(' '));`
            }, solutionCode: { python: `from collections import defaultdict; n=int(input()); g=defaultdict(list)
for _ in range(n): w=input(); g[''.join(sorted(w))].append(w)
for k in sorted(g): print(' '.join(sorted(g[k])))` }, testCases: [{ input: "4\neat\ntea\ntan\nate", expectedOutput: "ate eat tea\ntan" }, { input: "2\nabc\ncba", expectedOutput: "abc cba" }, { input: "1\nhello", expectedOutput: "hello" }, { input: "3\nlisten\nsilent\nenlist", expectedOutput: "enlist listen silent" }, { input: "2\nabc\ndef", expectedOutput: "abc\ndef" }] },
          { id: "str-code-5", title: "Longest Substring Without Repeat", difficulty: "Hard", scenario: "🔐 A password strength analyzer finds the longest substring with all unique characters as a quality metric.", description: "Find length of longest substring with all distinct characters.", constraints: "1 ≤ |s| ≤ 10^5", starterCode: { python: `s = input()
left = 0
seen = {}
max_len = 0
for right, ch in enumerate(s):
    if ch in seen and seen[ch] >= left:
        left = seen[ch] + 1
    seen[ch] = right
    max_len = max(max_len, right - left + 1)
print(max_len)` ,
              javascript: `const s = require('fs').readFileSync('/dev/stdin','utf8').trim();
let left = 0, maxLen = 0;
const seen = {};
for (let right = 0; right < s.length; right++) {
  if (seen[s[right]] !== undefined && seen[s[right]] >= left)
    left = seen[s[right]] + 1;
  seen[s[right]] = right;
  maxLen = Math.max(maxLen, right - left + 1);
}
console.log(maxLen);`
            }, solutionCode: { python: `s=input(); l=0; seen={}; mx=0
for r,c in enumerate(s):
    if c in seen and seen[c]>=l: l=seen[c]+1
    seen[c]=r; mx=max(mx,r-l+1)
print(mx)` }, testCases: [{ input: "abcabcbb", expectedOutput: "3" }, { input: "bbbbb", expectedOutput: "1" }, { input: "pwwkew", expectedOutput: "3" }, { input: "abcdef", expectedOutput: "6" }, { input: "a", expectedOutput: "1" }] }
        ],
        jumbledCode: [
          { id: "str-jumb-1", title: "Arrange: Count Vowels", description: "Count vowels in a string.", language: "python", lines: ["s = input().lower()", "count = 0", "print(count)", "for c in s:", "    if c in 'aeiou': count += 1"], correctOrder: [0, 1, 3, 4, 2], hint: "Read → initialize → loop → increment → print" },
          { id: "str-jumb-2", title: "Arrange: Caesar Cipher", description: "Encrypt string by shifting each letter by K positions.", language: "python", lines: ["result = ''", "k = int(input())", "s = input()", "for c in s:", "    if c.isalpha():", "        shifted = chr((ord(c.lower()) - ord('a') + k) % 26 + ord('a'))", "        result += shifted", "    else: result += c", "print(result)"], correctOrder: [2, 1, 0, 3, 4, 5, 6, 7, 8], hint: "Read string and k first, then transform each character" },
          { id: "str-jumb-3", title: "Arrange: Reverse Words", description: "Reverse words in a sentence.", language: "python", lines: ["words = sentence.split()", "sentence = input()", "print(' '.join(reversed(words)))"], correctOrder: [1, 0, 2], hint: "Read, split, reverse, join" },
          { id: "str-jumb-4", title: "Arrange: Check All Digits", description: "Check if string contains only digits.", language: "python", lines: ["s = input()", "print('YES' if s.isdigit() else 'NO')"], correctOrder: [0, 1], hint: "Simple isdigit check" },
          { id: "str-jumb-5", title: "Arrange: String Compression", description: "Compress 'aabccc' to 'a2b1c3'.", language: "python", lines: ["result = ''", "s = input()", "i = 0", "while i < len(s):", "    char = s[i]; count = 0", "    while i < len(s) and s[i] == char:", "        count += 1; i += 1", "    result += char + str(count)", "print(result)"], correctOrder: [1, 0, 2, 3, 4, 5, 6, 7, 8], hint: "Two-pointer run-length encoding" }
        ],
        missingCode: [
          { id: "str-miss-1", title: "Complete: Check Balanced Brackets", description: "Check if string has balanced brackets.", language: "python", template: `stack = []
for c in s:
    if c in '({[': stack.____(c)
    elif stack and ((c==')' and stack[-1]=='(') or
                    (c==']' and stack[-1]=='[') or
                    (c=='}' and stack[-1]=='{')):
        stack.____()
    else: return ____
return not ____`, blanks: ["append", "pop", "False", "stack"], hints: ["Push open bracket", "Pop matching bracket", "Mismatch found", "Stack empty = balanced"] },
          { id: "str-miss-2", title: "Complete: Longest Common Prefix", description: "Find longest common prefix of all strings.", language: "python", template: `prefix = strings[0]
for s in strings[1:]:
    while not s.startswith(____):
        prefix = prefix[____]
        if not prefix: return ''
return prefix`, blanks: ["prefix", ":-1"], hints: ["Check if s starts with current prefix", "Trim last char from prefix"] },
          { id: "str-miss-3", title: "Complete: Is Rotation", description: "Check if s2 is a rotation of s1.", language: "python", template: `def is_rotation(s1, s2):
    if len(s1) != len(s2): return False
    return s2 in (____ + ____)`, blanks: ["s1", "s1"], hints: ["Concatenate s1 with itself", "s2 must appear in double-s1"] },
          { id: "str-miss-4", title: "Complete: Count Palindromic Substrings", description: "Count substrings that are palindromes.", language: "python", template: `count = 0
for i in range(len(s)):
    for l, r in [(i,i), (i,i+1)]:  # odd and even centers
        while ____ >= 0 and r < len(s) and s[l] == s[r]:
            count += ____
            l -= 1; r += 1`, blanks: ["l", "1"], hints: ["Left boundary check", "Each expansion is one palindrome"] },
          { id: "str-miss-5", title: "Complete: Roman to Integer", description: "Convert Roman numeral string to integer.", language: "python", template: `roman = {'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000}
result = 0
for i in range(len(s)):
    if i < len(s)-1 and roman[s[i]] < roman[s[____]]:
        result ____ roman[s[i]]
    else:
        result ____ roman[s[i]]`, blanks: ["i+1", "-=", "+="], hints: ["Next character index", "Subtract if smaller than next", "Add normally"] }
        ],
        optimize: [
          { id: "str-opt-1", title: "Optimize: String Concatenation in Loop", scenario: "📝 Building a large string char by char.", badCode: `result = ''
for c in chars:
    result += c  # O(N²) total!`, goodCode: `result = []
for c in chars:
    result.append(c)  # O(1) amortized
result = ''.join(result)  # O(N)`, currentComplexity: "O(N²)", optimalComplexity: "O(N)", explanation: "Strings are immutable — += creates new string each time. Use list + join.", question: "Why is list.append + join O(N) total?", questionAnswer: "Append is O(1) amortized, join copies once O(N). Total = O(N) vs O(N²) for += in loop." },
          { id: "str-opt-2", title: "Optimize: Pattern Matching — KMP", scenario: "🔍 Search for pattern in large text document.", badCode: `# Naive O(N×M)
for i in range(len(text)-len(pat)+1):
    if text[i:i+len(pat)] == pat:
        print(i)`, goodCode: `# KMP O(N+M)
# Build failure function then match
# failure[i] = length of longest proper prefix = suffix`, currentComplexity: "O(N×M)", optimalComplexity: "O(N+M)", explanation: "KMP avoids re-checking characters by using the failure function.", question: "What does the KMP failure function store?", questionAnswer: "For each position, length of longest proper prefix of pattern that is also a suffix." },
          { id: "str-opt-3", title: "Optimize: All Substrings Sum", scenario: "🔢 Sum ASCII values of all distinct substrings.", badCode: `# O(N³)
seen = set()
for i in range(n):
    for j in range(i+1, n+1):
        sub = s[i:j]
        if sub not in seen:
            seen.add(sub); total += sum(ord(c) for c in sub)`, goodCode: `# O(N²) — contribution of each char
# char at index i contributes to (i+1)*(n-i) substrings
total = sum(ord(c)*(i+1)*(n-i) for i,c in enumerate(s))`, currentComplexity: "O(N³)", optimalComplexity: "O(N²) or O(N)", explanation: "Each character contributes to exactly (i+1)*(n-i) substrings.", question: "How many substrings include character at index i?", questionAnswer: "(i+1) choices for start (0..i) × (n-i) choices for end (i..n-1)" },
          { id: "str-opt-4", title: "Optimize: Longest Palindromic Substring", scenario: "🔄 Find longest palindrome in string.", badCode: `# O(N³) check all substrings
for i in range(n):
    for j in range(i, n):
        sub = s[i:j+1]
        if sub == sub[::-1]:  # O(N) check
            max_len = max(max_len, len(sub))`, goodCode: `# O(N²) expand-around-center
for i in range(n):
    for l, r in [(i,i),(i,i+1)]:  # odd & even
        while l>=0 and r<n and s[l]==s[r]: l-=1; r+=1
        max_len = max(max_len, r-l-1)`, currentComplexity: "O(N³)", optimalComplexity: "O(N²) center expansion, O(N) Manacher's", explanation: "Expand around 2N-1 possible centers instead of checking all substrings.", question: "Why are there 2N-1 possible centers?", questionAnswer: "N centers for odd-length palindromes + N-1 centers between chars for even-length = 2N-1" },
          { id: "str-opt-5", title: "Optimize: Edit Distance", scenario: "📱 Autocorrect system finds minimum edits to transform word.", badCode: `# Recursive without memo — exponential
def edit(i, j):
    if i==0: return j
    if j==0: return i
    if s[i-1]==t[j-1]: return edit(i-1, j-1)
    return 1 + min(edit(i-1,j), edit(i,j-1), edit(i-1,j-1))`, goodCode: `# DP O(M×N)
dp = [[0]*(n+1) for _ in range(m+1)]
for i in range(m+1): dp[i][0] = i
for j in range(n+1): dp[0][j] = j
for i in range(1,m+1):
    for j in range(1,n+1):
        if s[i-1]==t[j-1]: dp[i][j]=dp[i-1][j-1]
        else: dp[i][j]=1+min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])`, currentComplexity: "Exponential", optimalComplexity: "O(M×N)", explanation: "Memoize overlapping subproblems in 2D table.", question: "What do the 3 transitions in DP represent?", questionAnswer: "dp[i-1][j]=delete, dp[i][j-1]=insert, dp[i-1][j-1]=replace" }
        ]
      },

      "Pattern Matching": {
        objective: [
          { id: "pat-obj-1", question: "KMP algorithm preprocesses the pattern to build:", options: ["Suffix array", "Failure function / LPS array", "Hash table", "Trie"], answer: 1, explanation: "KMP builds Longest Proper Prefix-Suffix (LPS) array to skip redundant comparisons." },
          { id: "pat-obj-2", question: "Rabin-Karp uses rolling hash. Main advantage over naive:", options: ["Always O(1) match", "Average O(N+M) with hash comparison", "No false positives possible", "Works only for single char patterns"], answer: 1, explanation: "Rolling hash recalculates in O(1) per shift; total O(N+M) average, O(NM) worst (hash collisions)." },
          { id: "pat-obj-3", question: "Aho-Corasick algorithm is best when searching for:", options: ["One pattern in long text", "Multiple patterns simultaneously", "Regex patterns", "Approximate matches"], answer: 1, explanation: "Aho-Corasick builds trie + failure links to search all patterns in O(N+M+Z) where Z = matches." },
          { id: "pat-obj-4", question: "Z-algorithm computes Z[i] as:", options: ["Longest palindrome starting at i", "Length of longest string starting at i matching prefix of s", "Number of occurrences up to i", "Edit distance at position i"], answer: 1, explanation: "Z[i] = length of longest substring starting from s[i] that matches a prefix of s." },
          { id: "pat-obj-5", question: "Boyer-Moore scans pattern from:", options: ["Left to right", "Right to left", "Middle outward", "Both ends simultaneously"], answer: 1, explanation: "Boyer-Moore scans the pattern right-to-left, enabling large shifts when mismatches occur." }
        ],
        codeEditor: [
          { id: "pat-code-1", title: "Substring Count", difficulty: "Easy", scenario: "📧 An email filter counts how many times a spam keyword appears in message text.", description: "Count occurrences of pattern P in text T (overlapping allowed).", constraints: "1 ≤ |T| ≤ 10^5, 1 ≤ |P| ≤ |T|", starterCode: { python: `text = input()
pattern = input()
count = start = 0
while True:
    pos = text.find(pattern, start)
    if pos == -1: break
    count += 1
    start = pos + 1  # overlapping
print(count)` ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const text = lines[0], pattern = lines[1];
let count = 0, start = 0, pos;
while ((pos = text.indexOf(pattern, start)) !== -1) { count++; start = pos + 1; }
console.log(count);`
            }, solutionCode: { python: `t=input(); p=input(); c=s=0
while True:
    pos=t.find(p,s)
    if pos==-1: break
    c+=1; s=pos+1
print(c)` }, testCases: [{ input: "aaaa\naa", expectedOutput: "3" }, { input: "abcabc\nabc", expectedOutput: "2" }, { input: "hello\nworld", expectedOutput: "0" }, { input: "aababab\nab", expectedOutput: "3" }, { input: "a\na", expectedOutput: "1" }] },
          { id: "pat-code-2", title: "Find All Anagrams in String", difficulty: "Medium", scenario: "🎯 A word game finds all positions where any anagram of the pattern word starts.", description: "Find all start indices where anagram of P occurs in S.", constraints: "1 ≤ |S|,|P| ≤ 10^4", starterCode: { python: `from collections import Counter
s, p = input(), input()
need = Counter(p); window = Counter()
res = []; k = len(p)
for i, c in enumerate(s):
    window[c] += 1
    if i >= k:
        old = s[i-k]
        if window[old] == 1: del window[old]
        else: window[old] -= 1
    if window == need:
        res.append(i - k + 1)
print(*res)` ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const s = lines[0], p = lines[1], k = p.length;
const need = {}, win = {};
for (const c of p) need[c] = (need[c] || 0) + 1;
let formed = 0, required = Object.keys(need).length, res = [];
for (let r = 0; r < s.length; r++) {
  const c = s[r]; win[c] = (win[c] || 0) + 1;
  if (need[c] && win[c] === need[c]) formed++;
  if (r >= k) { const o = s[r-k]; if (win[o] === 1) delete win[o]; else win[o]--; if (need[o] && (win[o]||0) < need[o]) formed--; }
  if (formed === required) res.push(r - k + 1);
}
console.log(res.join(' '));`
            }, solutionCode: { python: `from collections import Counter; s,p=input(),input(); need=Counter(p); win=Counter(); res=[]; k=len(p)
for i,c in enumerate(s):
    win[c]+=1
    if i>=k:
        o=s[i-k]
        if win[o]==1: del win[o]
        else: win[o]-=1
    if win==need: res.append(i-k+1)
print(*res)` }, testCases: [{ input: "cbaebabacd\nabc", expectedOutput: "0 6" }, { input: "abab\nab", expectedOutput: "0 1 2" }, { input: "hello\nll", expectedOutput: "2" }, { input: "abc\nd", expectedOutput: "" }, { input: "aaab\nab", expectedOutput: "2" }] },
          { id: "pat-code-3", title: "Wildcard Matching", difficulty: "Hard", scenario: "🌐 A file system search supports wildcards: '?' matches any single char, '*' matches any sequence.", description: "Return YES if pattern with wildcards matches the string.", constraints: "1 ≤ |s|,|p| ≤ 1000", starterCode: { python: `s, p = input(), input()
m, n = len(s), len(p)
dp = [[False]*(n+1) for _ in range(m+1)]
dp[0][0] = True
for j in range(1, n+1):
    if p[j-1] == '*': dp[0][j] = dp[0][j-1]
for i in range(1, m+1):
    for j in range(1, n+1):
        if p[j-1] == '*':
            dp[i][j] = dp[i-1][j] or dp[i][j-1]
        elif p[j-1] == '?' or p[j-1] == s[i-1]:
            dp[i][j] = dp[i-1][j-1]
print("YES" if dp[m][n] else "NO")` ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const s = lines[0], p = lines[1], m = s.length, n = p.length;
const dp = Array.from({length:m+1},()=>new Array(n+1).fill(false));
dp[0][0] = true;
for (let j = 1; j <= n; j++) if (p[j-1] === '*') dp[0][j] = dp[0][j-1];
for (let i = 1; i <= m; i++)
  for (let j = 1; j <= n; j++)
    if (p[j-1] === '*') dp[i][j] = dp[i-1][j] || dp[i][j-1];
    else if (p[j-1] === '?' || p[j-1] === s[i-1]) dp[i][j] = dp[i-1][j-1];
console.log(dp[m][n] ? 'YES' : 'NO');`
            }, solutionCode: { python: `s,p=input(),input(); m,n=len(s),len(p); dp=[[False]*(n+1) for _ in range(m+1)]; dp[0][0]=True
for j in range(1,n+1):
    if p[j-1]=='*': dp[0][j]=dp[0][j-1]
for i in range(1,m+1):
    for j in range(1,n+1):
        if p[j-1]=='*': dp[i][j]=dp[i-1][j] or dp[i][j-1]
        elif p[j-1]=='?' or p[j-1]==s[i-1]: dp[i][j]=dp[i-1][j-1]
print("YES" if dp[m][n] else "NO")` }, testCases: [{ input: "adceb\n*a*b", expectedOutput: "YES" }, { input: "acdcb\na*c?b", expectedOutput: "NO" }, { input: "aa\n*", expectedOutput: "YES" }, { input: "abc\nabc", expectedOutput: "YES" }, { input: "abc\na?c", expectedOutput: "YES" }] },
          { id: "pat-code-4", title: "Repeated String Match", difficulty: "Medium", scenario: "🔁 How many times must string A be repeated so B becomes a substring?", description: "Find minimum number of times A must be repeated so B is a substring. Print -1 if impossible.", constraints: "1 ≤ |A|,|B| ≤ 10^4", starterCode: { python: `a, b = input(), input()
times = (len(b) // len(a)) + 1
repeated = a * times
if b in repeated: print(times)
elif b in repeated + a: print(times + 1)
else: print(-1)` ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const a = lines[0], b = lines[1];
const t = Math.ceil(b.length / a.length) + 1;
const rep = a.repeat(t);
if (rep.includes(b)) console.log(t - 1);
else if ((a + rep).includes(b)) console.log(t);
else console.log(-1);`
            }, solutionCode: { python: `a,b=input(),input(); t=(len(b)//len(a))+1; r=a*t; print(t if b in r else t+1 if b in r+a else -1)` }, testCases: [{ input: "abcd\ncdabcdab", expectedOutput: "3" }, { input: "a\naa", expectedOutput: "2" }, { input: "abc\nd", expectedOutput: "-1" }, { input: "abc\nabcabc", expectedOutput: "2" }, { input: "ab\nababababab", expectedOutput: "5" }] },
          { id: "pat-code-5", title: "Minimum Window Substring", difficulty: "Hard", scenario: "🎯 An NLP system finds the smallest window in text S containing all characters of pattern T.", description: "Find minimum window in S that contains all chars of T.", constraints: "1 ≤ |S|,|T| ≤ 10^5", starterCode: { python: `from collections import Counter
s, t = input(), input()
need = Counter(t); have = {}; formed = 0
required = len(need); res = ""; minLen = float('inf')
l = 0
for r, c in enumerate(s):
    have[c] = have.get(c, 0) + 1
    if c in need and have[c] == need[c]: formed += 1
    while formed == required:
        if r - l + 1 < minLen:
            minLen = r - l + 1; res = s[l:r+1]
        lc = s[l]; have[lc] -= 1
        if lc in need and have[lc] < need[lc]: formed -= 1
        l += 1
print(res)` ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const s = lines[0], t = lines[1];
const need = {}, have = {};
for (const c of t) need[c] = (need[c] || 0) + 1;
let formed = 0, required = Object.keys(need).length;
let l = 0, res = '', minLen = Infinity;
for (let r = 0; r < s.length; r++) {
  const c = s[r]; have[c] = (have[c] || 0) + 1;
  if (need[c] && have[c] === need[c]) formed++;
  while (formed === required) {
    if (r - l + 1 < minLen) { minLen = r - l + 1; res = s.slice(l, r + 1); }
    const lc = s[l]; have[lc]--; if (need[lc] && have[lc] < need[lc]) formed--;
    l++;
  }
}
console.log(res);`
            }, solutionCode: { python: `from collections import Counter; s,t=input(),input(); need=Counter(t); have={}; formed=0; required=len(need); res=""; ml=float('inf'); l=0
for r,c in enumerate(s):
    have[c]=have.get(c,0)+1
    if c in need and have[c]==need[c]: formed+=1
    while formed==required:
        if r-l+1<ml: ml=r-l+1;res=s[l:r+1]
        lc=s[l]; have[lc]-=1
        if lc in need and have[lc]<need[lc]: formed-=1
        l+=1
print(res)` }, testCases: [{ input: "ADOBECODEBANC\nABC", expectedOutput: "BANC" }, { input: "a\na", expectedOutput: "a" }, { input: "a\nb", expectedOutput: "" }, { input: "cabwefgewcwaefgcf\ncae", expectedOutput: "cwae" }, { input: "aa\naa", expectedOutput: "aa" }] }
        ],
        jumbledCode: [
          { id: "pat-jumb-1", title: "Arrange: KMP Failure Function", description: "Build KMP LPS (failure) array.", language: "python", lines: ["lps = [0] * n", "j = 0", "n = len(pattern)", "for i in range(1, n):", "    while j > 0 and pattern[i] != pattern[j]: j = lps[j-1]", "    if pattern[i] == pattern[j]: j += 1", "    lps[i] = j"], correctOrder: [2, 0, 1, 3, 4, 5, 6], hint: "Initialize, then expand prefix-suffix matches" },
          { id: "pat-jumb-2", title: "Arrange: Check Prefix", description: "Check if string s starts with prefix p.", language: "python", lines: ["p = input()", "s = input()", "print('YES' if s.startswith(p) else 'NO')"], correctOrder: [1, 0, 2], hint: "Read s then p, then check" },
          { id: "pat-jumb-3", title: "Arrange: Replace All Occurrences", description: "Replace all occurrences of pattern with replacement.", language: "python", lines: ["replacement = input()", "pattern = input()", "s = input()", "print(s.replace(pattern, replacement))"], correctOrder: [2, 1, 0, 3], hint: "Read in order: string, pattern, replacement" },
          { id: "pat-jumb-4", title: "Arrange: Count Distinct Substrings", description: "Count distinct substrings using set.", language: "python", lines: ["subs = set()", "s = input()", "for i in range(len(s)):", "    for j in range(i+1, len(s)+1):", "        subs.add(s[i:j])", "print(len(subs))"], correctOrder: [1, 0, 2, 3, 4, 5], hint: "Generate all substrings and add to set" },
          { id: "pat-jumb-5", title: "Arrange: Longest Prefix Suffix", description: "Find longest proper prefix that is also a suffix.", language: "python", lines: ["s = input()", "n = len(s)", "for length in range(n-1, 0, -1):", "    if s[:length] == s[n-length:]:", "        print(s[:length]); break", "else: print('')"], correctOrder: [0, 1, 2, 3, 4, 5], hint: "Try lengths from longest to shortest" }
        ],
        missingCode: [
          { id: "pat-miss-1", title: "Complete: Check Substring Exists", description: "Check if p is substring of s.", language: "python", template: `s, p = input(), input()
print('YES' if ____ in ____ else 'NO')`, blanks: ["p", "s"], hints: ["Pattern variable", "Text variable"] },
          { id: "pat-miss-2", title: "Complete: Count Matches Naive", description: "Naive pattern search.", language: "python", template: `count = 0
m, n = len(s), len(p)
for i in range(____ - ____ + 1):
    if s[i:i+____] == p:
        count += 1
print(count)`, blanks: ["m", "n", "n"], hints: ["Text length", "Pattern length", "Window size"] },
          { id: "pat-miss-3", title: "Complete: All Prefix Match Positions", description: "Find all positions where pattern starts.", language: "python", template: `positions = []
start = 0
while True:
    idx = s.find(p, ____)
    if idx == ____: break
    positions.append(idx)
    start = idx + ____
print(*positions)`, blanks: ["start", "-1", "1"], hints: ["Search from this position", "Not found return value", "Advance by 1 for overlapping"] },
          { id: "pat-miss-4", title: "Complete: Distinct Characters Count", description: "Count distinct chars in string.", language: "python", template: `s = input()
print(len(____(____ )))`, blanks: ["set", "s"], hints: ["Set removes duplicates", "Input string"] },
          { id: "pat-miss-5", title: "Complete: String to Char Frequency", description: "Print each char and frequency sorted.", language: "python", template: `from collections import Counter
freq = Counter(____)
for char, count in sorted(freq.____):
    print(char, count)`, blanks: ["s", "items()"], hints: ["Input to Counter", "Iterate key-value pairs"] }
        ],
        optimize: [
          { id: "pat-opt-1", title: "Optimize: Multiple Pattern Search", scenario: "🔍 Search for 1000 spam keywords in email.", badCode: `# O(N × K × M) where K=patterns, M=avg length
for pattern in patterns:
    if pattern in text: hits.append(pattern)`, goodCode: `# O(N + M + Z) using Aho-Corasick
# Build trie + failure links, then scan text once`, currentComplexity: "O(N×K×M)", optimalComplexity: "O(N+M+Z)", explanation: "Aho-Corasick scans text once, matching all patterns simultaneously.", question: "What is Z in Aho-Corasick complexity?", questionAnswer: "Z = total number of pattern matches found in the text" },
          { id: "pat-opt-2", title: "Optimize: Hash-based Pattern Search", scenario: "📚 Finding author signature in millions of texts.", badCode: `# Recompute hash every window — O(N×M)
for i in range(n-m+1):
    if hash(text[i:i+m]) == hash(pattern): ...`, goodCode: `# Rolling hash — O(N+M) average
# new_hash = (old_hash - text[i-1]*base^(m-1)) * base + text[i+m-1]`, currentComplexity: "O(N×M)", optimalComplexity: "O(N+M) average", explanation: "Rolling hash updates in O(1) by removing old char contribution.", question: "What causes worst case O(NM) even with rolling hash?", questionAnswer: "Hash collisions — when false positives trigger full string comparison repeatedly." },
          { id: "pat-opt-3", title: "Optimize: Palindrome Check All Substrings", scenario: "🔄 Count all palindromic substrings.", badCode: `# O(N³)
count = 0
for i in range(n):
    for j in range(i, n):
        sub = s[i:j+1]
        if sub == sub[::-1]: count += 1`, goodCode: `# O(N²) expand around center
count = 0
for i in range(n):
    for l, r in [(i,i),(i,i+1)]:
        while l>=0 and r<n and s[l]==s[r]:
            count += 1; l-=1; r+=1`, currentComplexity: "O(N³)", optimalComplexity: "O(N²)", explanation: "Expanding from center avoids repeated work.", question: "Can we do O(N)? How?", questionAnswer: "Yes — Manacher's algorithm processes each character once with smart boundary tracking." },
          { id: "pat-opt-4", title: "Optimize: Regex vs Manual Parsing", scenario: "📊 Parse log timestamps from millions of log lines.", badCode: `# re.compile outside loop is key
import re
for line in logs:
    match = re.compile(r'\\d{4}-\\d{2}-\\d{2}').search(line)`, goodCode: `# Compile once, reuse!
import re
pattern = re.compile(r'\\d{4}-\\d{2}-\\d{2}')
for line in logs:
    match = pattern.search(line)`, currentComplexity: "O(N×compile_time)", optimalComplexity: "O(N)", explanation: "Compiling regex has overhead. Compiled object is reusable.", question: "Where should regex.compile() be called?", questionAnswer: "Outside any loop — compile once, use many times." },
          { id: "pat-opt-5", title: "Optimize: Suffix Array Construction", scenario: "📖 Build full-text search index for document.", badCode: `# O(N² log N) naive sort
suffixes = sorted(range(n), key=lambda i: s[i:])`, goodCode: `# DC3/SA-IS algorithm O(N)
# Or use O(N log² N) with binary search:
# Build rank array, double suffix length each iteration`, currentComplexity: "O(N² log N)", optimalComplexity: "O(N log N) practical, O(N) theoretical", explanation: "Comparing full suffixes in sort is expensive; smarter algorithms reuse computed info.", question: "What is the suffix array used for?", questionAnswer: "Pattern matching in O(M log N), LCP queries, string similarity — forms basis of genome alignment tools." }
        ]
      }
    }
  },

  // ═══════════════════════════════════════════════════════════
  //  TOPIC: LINKED LISTS
  // ═══════════════════════════════════════════════════════════
  "Linked List": {
    topicIcon: "🔗",
    topicColor: "#f59e0b",
    subtopics: {
      "Singly Linked List": {
        objective: [
          { id: "sll-obj-1", question: "In a singly linked list, accessing the Kth node from the end requires:", options: ["O(1) with direct pointer", "O(K) with backward traversal", "O(N) with two-pointer technique", "O(N²) with nested loops"], answer: 2, explanation: "Two pointers: advance first by K, then move both until first reaches end → second is at K from end. One full pass O(N)." },
          { id: "sll-obj-2", question: "Detecting a cycle in linked list — Floyd's algorithm uses:", options: ["Extra hash set", "Two pointers: slow (1 step) and fast (2 steps)", "Recursion with visited set", "Reverse and compare"], answer: 1, explanation: "Slow moves 1, fast moves 2. If cycle exists, they meet in the cycle." },
          { id: "sll-obj-3", question: "Merging two sorted linked lists — optimal time complexity:", options: ["O(N²)", "O(N log N)", "O(N+M)", "O(N×M)"], answer: 2, explanation: "Single pass through both lists simultaneously, comparing heads → O(N+M)." },
          { id: "sll-obj-4", question: "What is the space complexity of reversing a linked list iteratively?", options: ["O(N)", "O(log N)", "O(1)", "O(N²)"], answer: 2, explanation: "Only 3 pointers needed (prev, curr, next) regardless of list size → O(1) space." },
          { id: "sll-obj-5", question: "A doubly linked list uses more memory than singly linked list because:", options: ["Bigger node values", "Extra 'prev' pointer per node", "Circular structure", "Dynamic allocation overhead"], answer: 1, explanation: "Each node stores an extra pointer to previous node → 1 extra pointer per node." }
        ],
        codeEditor: [
          { id: "sll-code-1", title: "Detect Cycle in GPS Route", difficulty: "Medium", scenario: "🗺️ A GPS navigation system stores route waypoints as a linked list. Due to a bug, some routes create loops (infinite navigation). Detect if the route has a cycle.", description: "Given linked list as edges (pairs), detect if cycle exists. Print YES or NO.", constraints: "1 ≤ N ≤ 10^5", starterCode: { python: `# Using adjacency: detect cycle in directed graph (simplified)
n, m = map(int, input().split())
visited = set()
for _ in range(m):
    u, v = map(int, input().split())
# Use Floyd's concept on array
# Simplified: detect self-loop or back-edge
print("YES")  # placeholder — implement properly` ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const [n, m] = lines[0].split(' ').map(Number);
const adj = Array.from({length: n + 1}, () => []);
for (let i = 1; i <= m; i++) {
  const [u, v] = lines[i].split(' ').map(Number);
  adj[u].push(v);
}
const visited = new Set(), recStack = new Set();
function dfs(v) {
  visited.add(v); recStack.add(v);
  for (const nb of adj[v]) {
    if (!visited.has(nb) && dfs(nb)) return true;
    if (recStack.has(nb)) return true;
  }
  recStack.delete(v); return false;
}
let hasCycle = false;
for (let v = 1; v <= n; v++) if (!visited.has(v) && dfs(v)) { hasCycle = true; break; }
console.log(hasCycle ? 'YES' : 'NO');`
            }, solutionCode: { python: `n,m=map(int,input().split()); adj=[[] for _ in range(n+1)]
for _ in range(m):
    u,v=map(int,input().split()); adj[u].append(v)
visited=set(); rec_stack=set()
def dfs(v):
    visited.add(v); rec_stack.add(v)
    for nb in adj[v]:
        if nb not in visited and dfs(nb): return True
        if nb in rec_stack: return True
    rec_stack.discard(v); return False
print("YES" if any(dfs(v) for v in range(1,n+1) if v not in visited) else "NO")` }, testCases: [{ input: "4 4\n1 2\n2 3\n3 4\n4 2", expectedOutput: "YES" }, { input: "3 2\n1 2\n2 3", expectedOutput: "NO" }, { input: "2 2\n1 2\n2 1", expectedOutput: "YES" }, { input: "5 4\n1 2\n2 3\n3 4\n4 5", expectedOutput: "NO" }, { input: "3 3\n1 2\n2 3\n3 1", expectedOutput: "YES" }] },
          { id: "sll-code-2", title: "Find Middle of Playlist", difficulty: "Easy", scenario: "🎵 A music player stores songs in a linked list. The 'shuffle from middle' feature needs the middle song's position.", description: "Find the middle node value. If even length, return second middle.", constraints: "1 ≤ N ≤ 10^5", starterCode: { python: `n = int(input())
arr = list(map(int, input().split()))
print(arr[(n) // 2])` ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const n = parseInt(lines[0]);
const arr = lines[1].split(' ').map(Number);
console.log(arr[Math.floor(n / 2)]);`
            }, solutionCode: { python: `n=int(input()); a=list(map(int,input().split())); print(a[n//2])` }, testCases: [{ input: "5\n1 2 3 4 5", expectedOutput: "3" }, { input: "6\n1 2 3 4 5 6", expectedOutput: "4" }, { input: "1\n42", expectedOutput: "42" }, { input: "4\n10 20 30 40", expectedOutput: "30" }, { input: "3\n5 10 15", expectedOutput: "10" }] },
          { id: "sll-code-3", title: "Reverse Linked List", difficulty: "Easy", scenario: "📋 An undo system stores actions in a linked list. Reversing gives the undo sequence. Reverse and print.", description: "Reverse the linked list represented as array, print reversed.", constraints: "1 ≤ N ≤ 10^5", starterCode: { python: `n = int(input())
arr = list(map(int, input().split()))
print(*arr[::-1])` ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const n = parseInt(lines[0]);
const arr = lines[1].split(' ').map(Number);
console.log(arr.reverse().join(' '));`
            }, solutionCode: { python: `n=int(input()); a=list(map(int,input().split())); print(*a[::-1])` }, testCases: [{ input: "5\n1 2 3 4 5", expectedOutput: "5 4 3 2 1" }, { input: "3\n7 8 9", expectedOutput: "9 8 7" }, { input: "1\n42", expectedOutput: "42" }, { input: "4\n100 200 300 400", expectedOutput: "400 300 200 100" }, { input: "2\n1 2", expectedOutput: "2 1" }] },
          { id: "sll-code-4", title: "Merge Two Sorted Task Lists", difficulty: "Medium", scenario: "📋 Two project managers each have sorted task priority lists. Merge them into one sorted master list.", description: "Merge two sorted arrays into one sorted array.", constraints: "1 ≤ N,M ≤ 10^5", starterCode: { python: `import heapq
n = int(input())
a = list(map(int, input().split()))
m = int(input())
b = list(map(int, input().split()))
print(*sorted(a + b))` ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const n = parseInt(lines[0]);
const a = lines[1].split(' ').map(Number);
const m = parseInt(lines[2]);
const b = lines[3].split(' ').map(Number);
console.log([...a, ...b].sort((x, y) => x - y).join(' '));`
            }, solutionCode: { python: `n=int(input()); a=list(map(int,input().split())); m=int(input()); b=list(map(int,input().split())); print(*sorted(a+b))` }, testCases: [{ input: "3\n1 3 5\n3\n2 4 6", expectedOutput: "1 2 3 4 5 6" }, { input: "2\n1 2\n2\n3 4", expectedOutput: "1 2 3 4" }, { input: "1\n5\n1\n3", expectedOutput: "3 5" }, { input: "3\n1 2 3\n3\n1 2 3", expectedOutput: "1 1 2 2 3 3" }, { input: "2\n10 20\n2\n5 15", expectedOutput: "5 10 15 20" }] },
          { id: "sll-code-5", title: "Remove Nth Node From End", difficulty: "Medium", scenario: "📦 A delivery queue needs the Nth package from the end removed (priority system). Remove element at position N from end (1-indexed) and print remaining.", description: "Remove Nth element from end of array.", constraints: "1 ≤ N ≤ array_size ≤ 10^5", starterCode: { python: `size = int(input())
arr = list(map(int, input().split()))
n = int(input())
idx = size - n
arr.pop(idx)
print(*arr)` ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const size = parseInt(lines[0]);
const arr = lines[1].split(' ').map(Number);
const n = parseInt(lines[2]);
arr.splice(size - n, 1);
console.log(arr.join(' '));`
            }, solutionCode: { python: `sz=int(input()); a=list(map(int,input().split())); n=int(input()); a.pop(sz-n); print(*a)` }, testCases: [{ input: "5\n1 2 3 4 5\n2", expectedOutput: "1 2 3 5" }, { input: "5\n1 2 3 4 5\n1", expectedOutput: "1 2 3 4" }, { input: "5\n1 2 3 4 5\n5", expectedOutput: "2 3 4 5" }, { input: "3\n10 20 30\n2", expectedOutput: "10 30" }, { input: "1\n99\n1", expectedOutput: "" }] }
        ],
        jumbledCode: [
          { id: "sll-jumb-1", title: "Arrange: Floyd's Cycle Detection", description: "Detect cycle using slow/fast pointers.", language: "python", lines: ["slow = fast = head", "while fast and fast.next:", "    slow = slow.next", "    fast = fast.next.next", "    if slow == fast: return True", "return False"], correctOrder: [0, 1, 2, 3, 4, 5], hint: "Initialize both, advance, check equality" },
          { id: "sll-jumb-2", title: "Arrange: Find Intersection Node", description: "Find intersection of two linked lists by lengths.", language: "python", lines: ["while a != b:", "    a = a.next if a else headB", "    b = b.next if b else headA", "a = headA; b = headB", "return a"], correctOrder: [3, 0, 1, 2, 4], hint: "Two pointers switch lists when reaching end" },
          { id: "sll-jumb-3", title: "Arrange: Reverse in Groups of K", description: "Reverse every K nodes.", language: "python", lines: ["def reverse_k(head, k):", "    curr = head; count = 0; prev = None", "    while curr and count < k:", "        nxt = curr.next; curr.next = prev", "        prev = curr; curr = nxt; count += 1", "    if curr: head.next = reverse_k(curr, k)", "    return prev"], correctOrder: [0, 1, 2, 3, 4, 5, 6], hint: "Reverse first k, then recurse on rest" },
          { id: "sll-jumb-4", title: "Arrange: Delete Duplicates", description: "Remove duplicates from sorted linked list.", language: "python", lines: ["curr = head", "while curr and curr.next:", "    if curr.val == curr.next.val:", "        curr.next = curr.next.next", "    else:", "        curr = curr.next"], correctOrder: [0, 1, 2, 3, 4, 5], hint: "Compare adjacent, skip or advance" },
          { id: "sll-jumb-5", title: "Arrange: Palindrome Linked List", description: "Check if linked list is palindrome.", language: "python", lines: ["vals = []", "curr = head", "while curr:", "    vals.append(curr.val); curr = curr.next", "print('YES' if vals == vals[::-1] else 'NO')"], correctOrder: [0, 1, 2, 3, 4], hint: "Collect all values, compare with reverse" }
        ],
        missingCode: [
          { id: "sll-miss-1", title: "Complete: Two Pointer for Kth from End", description: "Find Kth element from end.", language: "python", template: `n = int(input())
arr = list(map(int, input().split()))
k = int(input())
print(arr[____ - ____])`, blanks: ["n", "k"], hints: ["Array length", "K from end means index n-k"] },
          { id: "sll-miss-2", title: "Complete: Check Palindrome List", description: "Check if list is palindrome.", language: "python", template: `arr = list(map(int, input().split()))
print("YES" if arr == arr[____:____] else "NO")`, blanks: ["::-1", ""], hints: ["Reverse slice", "Empty means full slice — actually just arr[::-1] is enough"] },
          { id: "sll-miss-3", title: "Complete: Count Nodes", description: "Count nodes by traversal.", language: "python", template: `count = ____
for _ in arr:
    ____ += 1
print(____)`, blanks: ["0", "count", "count"], hints: ["Start at 0", "Increment per element", "Print result"] },
          { id: "sll-miss-4", title: "Complete: Rotate List Right by K", description: "Rotate linked list (array) right by K.", language: "python", template: `k = k % ____
result = arr[____ - k:] + arr[:____ - k]
print(*result)`, blanks: ["n", "n", "n"], hints: ["Mod by length to handle k>n", "Last k elements go first", "First n-k elements go last"] },
          { id: "sll-miss-5", title: "Complete: Odd Even Segregation", description: "Group all odd-index nodes before even-index nodes.", language: "python", template: `odds = arr[____::2]
evens = arr[____::2]
print(*(____ + ____))`, blanks: ["0", "1", "odds", "evens"], hints: ["Start from index 0, step 2", "Start from index 1, step 2", "Odds first", "Then evens"] }
        ],
        optimize: [
          { id: "sll-opt-1", title: "Optimize: Delete Node Without Head Reference", scenario: "🗑️ Delete a node knowing only the node itself (not head).", badCode: `# Can't really traverse from head
# Common mistake: try to find prev
curr = head
while curr.next != node: curr = curr.next  # need head!
curr.next = node.next  # O(N) and needs head`, goodCode: `# Copy next node's data, delete next
node.val = node.next.val
node.next = node.next.next  # O(1), no head needed`, currentComplexity: "O(N)", optimalComplexity: "O(1)", explanation: "Copy successor data into current node, then skip successor.", question: "What is the limitation of this approach?", questionAnswer: "Cannot delete the last node of the list — no successor to copy from." },
          { id: "sll-opt-2", title: "Optimize: LRU Cache Implementation", scenario: "💾 Browser cache evicts least recently used pages.", badCode: `# Array-based: O(N) for every operation
cache = []
def get(key):
    for i, (k,v) in enumerate(cache):
        if k==key: cache.pop(i); cache.append((k,v)); return v
    return -1`, goodCode: `# Doubly LinkedList + HashMap: O(1) all ops
from collections import OrderedDict
class LRU:
    def __init__(self, cap): self.cap=cap; self.cache=OrderedDict()
    def get(self, key):
        if key not in self.cache: return -1
        self.cache.move_to_end(key); return self.cache[key]
    def put(self, key, val):
        self.cache[key]=val; self.cache.move_to_end(key)
        if len(self.cache)>self.cap: self.cache.popitem(last=False)`, currentComplexity: "O(N) per operation", optimalComplexity: "O(1) per operation", explanation: "OrderedDict = HashMap + doubly linked list = O(1) move_to_end and popitem.", question: "Why doubly linked list over singly for LRU?", questionAnswer: "Need to remove arbitrary node in O(1) — requires access to previous node, only possible in doubly linked list." },
          { id: "sll-opt-3", title: "Optimize: Sort Linked List", scenario: "📊 Sort a linked list of 10 million records.", badCode: `# Collect to array, sort, rebuild — O(N log N) but O(N) space
vals = []
curr = head
while curr: vals.append(curr.val); curr = curr.next
vals.sort()  # rebuilds entire structure`, goodCode: `# Merge sort in-place — O(N log N) time, O(log N) stack space
def merge_sort(head):
    if not head or not head.next: return head
    mid = get_middle(head)
    right = mid.next; mid.next = None
    return merge(merge_sort(head), merge_sort(right))`, currentComplexity: "O(N log N) with O(N) extra", optimalComplexity: "O(N log N) with O(log N) stack", explanation: "Merge sort on linked lists avoids random access requirement unlike quicksort/heapsort.", question: "Why is merge sort preferred for linked lists over quicksort?", questionAnswer: "Quicksort needs O(1) access to random pivot; linked list random access is O(N). Merge sort only needs sequential access." },
          { id: "sll-opt-4", title: "Optimize: Clone List with Random Pointer", scenario: "🧬 Clone a complex linked list where each node also has a random pointer to any node.", badCode: `# Two-pass with hash map — O(N) space
node_map = {}
curr = head
while curr: node_map[curr] = Node(curr.val); curr = curr.next
curr = head
while curr:
    node_map[curr].next = node_map.get(curr.next)
    node_map[curr].random = node_map.get(curr.random)
    curr = curr.next`, goodCode: `# Interleave technique — O(1) extra space
# Step 1: Insert clone after each original
# Step 2: Set random pointers
# Step 3: Separate the two lists`, currentComplexity: "O(N) time, O(N) space", optimalComplexity: "O(N) time, O(1) extra space", explanation: "Interleaving original and clone allows finding random mappings without hash map.", question: "What is Step 1 of the interleave technique?", questionAnswer: "After each node A, insert its clone A' so list becomes: A→A'→B→B'→..." },
          { id: "sll-opt-5", title: "Optimize: Flatten Multilevel List", scenario: "📂 A file system stores nested folders as multilevel doubly linked list. Flatten to single level.", badCode: `# Recursive — O(N) space due to call stack
def flatten(head):
    curr = head
    while curr:
        if curr.child:
            curr.child = flatten(curr.child)  # recurse
            # reconnect
        curr = curr.next`, goodCode: `# Iterative with stack — O(D) where D=max depth
stack = []
curr = head
while curr:
    if curr.child:
        if curr.next: stack.append(curr.next)
        curr.next = curr.child; curr.child = None
    elif not curr.next and stack:
        curr.next = stack.pop()
    curr = curr.next`, currentComplexity: "O(N) time, O(N) recursive space", optimalComplexity: "O(N) time, O(D) iterative space", explanation: "Stack-based approach avoids recursion depth issues; only stores boundary nodes.", question: "When does iterative approach significantly save space vs recursive?", questionAnswer: "When depth D << N (wide but shallow structure); worst case both are O(N) space." }
        ]
      }
    }
  },

  // ═══════════════════════════════════════════════════════════
  //  TOPIC: STACK & QUEUE
  // ═══════════════════════════════════════════════════════════
  "Stack & Queue": {
    topicIcon: "📚",
    topicColor: "#8b5cf6",
    subtopics: {
      "Stack": {
        objective: [
          { id: "stk-obj-1", question: "Browser's back button works exactly like a:", options: ["Queue", "Stack", "Priority Queue", "Deque"], answer: 1, explanation: "Most recently visited page (pushed last) is the one you go back to (popped first) → LIFO = Stack." },
          { id: "stk-obj-2", question: "Infix to postfix conversion uses a stack for:", options: ["Operands", "Operators", "Both", "Neither"], answer: 1, explanation: "Operators are pushed/popped from stack based on precedence. Operands go directly to output." },
          { id: "stk-obj-3", question: "What causes a stack overflow error in recursion?", options: ["Too many variables", "Infinite recursion — no base case", "Large array allocation", "Memory fragmentation"], answer: 1, explanation: "Each function call adds a frame to call stack. Without base case, stack grows until OS limit." },
          { id: "stk-obj-4", question: "Monotonic stack is best suited for:", options: ["Sorting", "Finding next greater element", "BFS traversal", "Binary search"], answer: 1, explanation: "Monotonic stack maintains elements in increasing/decreasing order, efficiently finding next greater/smaller." },
          { id: "stk-obj-5", question: "Using stack to evaluate postfix '2 3 + 4 *':", options: ["14", "20", "10", "24"], answer: 1, explanation: "Push 2,3 → pop both, push 2+3=5 → push 4 → pop both, push 5×4=20 → result: 20." }
        ],
        codeEditor: [
          { id: "stk-code-1", title: "Valid Bracket Expression", difficulty: "Easy", scenario: "💻 An IDE's syntax checker validates bracket pairing in code. Check if brackets are correctly nested and matched.", description: "Check if brackets () [] {} are valid. Print YES or NO.", constraints: "1 ≤ |s| ≤ 10^5", starterCode: { python: `s = input()
stack = []
pairs = {')': '(', ']': '[', '}': '{'}
for c in s:
    if c in '([{':
        stack.append(c)
    elif c in ')]}':
        if not stack or stack[-1] != pairs[c]:
            print("NO"); exit()
        stack.pop()
print("YES" if not stack else "NO")` ,
              javascript: `const s = require('fs').readFileSync('/dev/stdin','utf8').trim();
const stack = [], pairs = {')':'(',']':'[','}':'{'};
for (const c of s) {
  if ('([{'.includes(c)) stack.push(c);
  else if (')]}'.includes(c)) {
    if (!stack.length || stack[stack.length-1] !== pairs[c]) { console.log('NO'); process.exit(); }
    stack.pop();
  }
}
console.log(stack.length === 0 ? 'YES' : 'NO');`
            }, solutionCode: { python: `s=input(); stk=[]; p={')':'(', ']':'[', '}':'{'}
for c in s:
    if c in '([{': stk.append(c)
    elif c in ')]}':
        if not stk or stk[-1]!=p[c]: print("NO"); exit()
        stk.pop()
print("YES" if not stk else "NO")` }, testCases: [{ input: "()[]{}", expectedOutput: "YES" }, { input: "([)]", expectedOutput: "NO" }, { input: "{[]}", expectedOutput: "YES" }, { input: "(", expectedOutput: "NO" }, { input: "", expectedOutput: "YES" }] },
          { id: "stk-code-2", title: "Next Greater Element", difficulty: "Medium", scenario: "📈 A stock market analyzer finds for each day the next day with a higher price. For each element, find the next greater element to its right (-1 if none).", description: "For each element print its next greater element, or -1.", constraints: "1 ≤ N ≤ 10^5", starterCode: { python: `n = int(input())
arr = list(map(int, input().split()))
result = [-1] * n
stack = []
for i in range(n):
    while stack and arr[stack[-1]] < arr[i]:
        result[stack.pop()] = arr[i]
    stack.append(i)
print(*result)` ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const n = parseInt(lines[0]);
const arr = lines[1].split(' ').map(Number);
const result = new Array(n).fill(-1);
const stack = [];
for (let i = 0; i < n; i++) {
  while (stack.length && arr[stack[stack.length-1]] < arr[i])
    result[stack.pop()] = arr[i];
  stack.push(i);
}
console.log(result.join(' '));`
            }, solutionCode: { python: `n=int(input()); a=list(map(int,input().split())); res=[-1]*n; stk=[]
for i in range(n):
    while stk and a[stk[-1]]<a[i]: res[stk.pop()]=a[i]
    stk.append(i)
print(*res)` }, testCases: [{ input: "5\n4 5 2 25 7", expectedOutput: "5 25 25 -1 -1" }, { input: "4\n13 7 6 12", expectedOutput: "-1 12 12 -1" }, { input: "3\n1 2 3", expectedOutput: "2 3 -1" }, { input: "3\n3 2 1", expectedOutput: "-1 -1 -1" }, { input: "1\n5", expectedOutput: "-1" }] },
          { id: "stk-code-3", title: "Min Stack", difficulty: "Medium", scenario: "⚡ A trading system's memory-efficient min-tracker needs constant-time minimum query alongside push/pop.", description: "Simulate min stack: push, pop, getMin all in O(1).", constraints: "Q operations ≤ 10^5", starterCode: { python: `import sys
q = int(input())
stack = []
min_stack = []
for _ in range(q):
    op = input().split()
    if op[0] == 'push':
        val = int(op[1])
        stack.append(val)
        min_stack.append(min(val, min_stack[-1] if min_stack else val))
    elif op[0] == 'pop':
        stack.pop(); min_stack.pop()
    elif op[0] == 'getMin':
        print(min_stack[-1])` ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const q = parseInt(lines[0]);
const stack = [], minStack = [];
for (let i = 1; i <= q; i++) {
  const parts = lines[i].split(' ');
  if (parts[0] === 'push') {
    const v = parseInt(parts[1]); stack.push(v);
    minStack.push(Math.min(v, minStack.length ? minStack[minStack.length-1] : v));
  } else if (parts[0] === 'pop') { stack.pop(); minStack.pop(); }
  else if (parts[0] === 'getMin') console.log(minStack[minStack.length-1]);
}`
            }, solutionCode: { python: `q=int(input()); stk=[]; ms=[]
for _ in range(q):
    o=input().split()
    if o[0]=='push': v=int(o[1]); stk.append(v); ms.append(min(v,ms[-1]if ms else v))
    elif o[0]=='pop': stk.pop(); ms.pop()
    elif o[0]=='getMin': print(ms[-1])` }, testCases: [{ input: "5\npush 3\npush 5\npush 2\ngetMin\npop", expectedOutput: "2" }, { input: "3\npush 1\npush 2\ngetMin", expectedOutput: "1" }, { input: "4\npush 5\npush 3\npop\ngetMin", expectedOutput: "5" }, { input: "2\npush 10\ngetMin", expectedOutput: "10" }, { input: "6\npush 2\npush 0\npush 3\npush 0\ngetMin\ngetMin", expectedOutput: "0\n0" }] },
          { id: "stk-code-4", title: "Largest Rectangle in Histogram", difficulty: "Hard", scenario: "🏙️ An architect needs the largest billboard that fits in a skyline histogram of building heights.", description: "Find largest rectangle area in histogram.", constraints: "1 ≤ N ≤ 10^5, 0 ≤ heights[i] ≤ 10^9", starterCode: { python: `n = int(input())
heights = list(map(int, input().split()))
heights.append(0)
stack = []
max_area = 0
for i, h in enumerate(heights):
    while stack and heights[stack[-1]] >= h:
        height = heights[stack.pop()]
        width = i if not stack else i - stack[-1] - 1
        max_area = max(max_area, height * width)
    stack.append(i)
print(max_area)` ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const n = parseInt(lines[0]);
const heights = lines[1].split(' ').map(Number);
heights.push(0);
const stack = []; let maxArea = 0;
for (let i = 0; i < heights.length; i++) {
  while (stack.length && heights[stack[stack.length-1]] >= heights[i]) {
    const h = heights[stack.pop()];
    const w = stack.length ? i - stack[stack.length-1] - 1 : i;
    maxArea = Math.max(maxArea, h * w);
  }
  stack.push(i);
}
console.log(maxArea);`
            }, solutionCode: { python: `n=int(input()); h=list(map(int,input().split()))+[0]; stk=[]; mx=0
for i,v in enumerate(h):
    while stk and h[stk[-1]]>=v:
        ht=h[stk.pop()]; w=i if not stk else i-stk[-1]-1; mx=max(mx,ht*w)
    stk.append(i)
print(mx)` }, testCases: [{ input: "6\n2 1 5 6 2 3", expectedOutput: "10" }, { input: "2\n2 4", expectedOutput: "4" }, { input: "5\n1 1 1 1 1", expectedOutput: "5" }, { input: "3\n3 3 3", expectedOutput: "9" }, { input: "1\n5", expectedOutput: "5" }] },
          { id: "stk-code-5", title: "Daily Temperatures", difficulty: "Medium", scenario: "🌡️ A weather app shows users 'how many days until warmer weather'. For each day, find days until next warmer day (0 if none).", description: "For each temperature find number of days until warmer. Output 0 if none.", constraints: "1 ≤ N ≤ 10^5, 30 ≤ T ≤ 100", starterCode: { python: `n = int(input())
temps = list(map(int, input().split()))
result = [0] * n
stack = []
for i in range(n):
    while stack and temps[stack[-1]] < temps[i]:
        idx = stack.pop()
        result[idx] = i - idx
    stack.append(i)
print(*result)` ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const n = parseInt(lines[0]);
const temps = lines[1].split(' ').map(Number);
const result = new Array(n).fill(0);
const stack = [];
for (let i = 0; i < n; i++) {
  while (stack.length && temps[stack[stack.length-1]] < temps[i])
    result[stack.pop()] = i - stack[stack.length]; // bug-fix: recalc after pop
  stack.push(i);
}
// Recalculate correctly
const result2 = new Array(n).fill(0);
const st2 = [];
for (let i = 0; i < n; i++) {
  while (st2.length && temps[st2[st2.length-1]] < temps[i]) {
    const idx = st2.pop();
    result2[idx] = i - idx;
  }
  st2.push(i);
}
console.log(result2.join(' '));`
            }, solutionCode: { python: `n=int(input()); t=list(map(int,input().split())); res=[0]*n; stk=[]
for i in range(n):
    while stk and t[stk[-1]]<t[i]: idx=stk.pop(); res[idx]=i-idx
    stk.append(i)
print(*res)` }, testCases: [{ input: "6\n73 74 75 71 69 72", expectedOutput: "1 1 4 2 1 0" }, { input: "3\n30 40 50", expectedOutput: "1 1 0" }, { input: "4\n30 60 90 60", expectedOutput: "1 1 0 0" }, { input: "5\n70 70 70 70 70", expectedOutput: "0 0 0 0 0" }, { input: "1\n50", expectedOutput: "0" }] }
        ],
        jumbledCode: [
          { id: "stk-jumb-1", title: "Arrange: Evaluate Postfix", description: "Evaluate postfix expression.", language: "python", lines: ["tokens = input().split()", "stack = []", "for token in tokens:", "    if token.lstrip('-').isdigit(): stack.append(int(token))", "    else:", "        b, a = stack.pop(), stack.pop()", "        if token=='+': stack.append(a+b)", "        elif token=='-': stack.append(a-b)", "        elif token=='*': stack.append(a*b)", "        else: stack.append(int(a/b))", "print(stack[0])"], correctOrder: [0,1,2,3,4,5,6,7,8,9,10], hint: "Read tokens, push numbers, apply ops" },
          { id: "stk-jumb-2", title: "Arrange: Stock Span Problem", description: "For each day, find span (consecutive days with price ≤ today).", language: "python", lines: ["span = []", "stack = []", "for i, price in enumerate(prices):", "    while stack and prices[stack[-1]] <= price: stack.pop()", "    span.append(i - stack[-1] if stack else i + 1)", "    stack.append(i)", "print(*span)"], correctOrder: [0,1,2,3,4,5,6], hint: "Pop smaller prices, span = diff from last greater" },
          { id: "stk-jumb-3", title: "Arrange: Reverse String Using Stack", description: "Reverse a string using explicit stack.", language: "python", lines: ["s = input()", "stack = list(s)", "result = ''", "while stack:", "    result += stack.pop()", "print(result)"], correctOrder: [0,1,2,3,4,5], hint: "Push all chars, pop to build reverse" },
          { id: "stk-jumb-4", title: "Arrange: Remove K Digits for Smallest Number", description: "Remove K digits to make smallest number.", language: "python", lines: ["k = int(input())", "num = input()", "stack = []", "for d in num:", "    while k and stack and stack[-1] > d: stack.pop(); k -= 1", "    stack.append(d)", "print(int(''.join(stack[:len(stack)-k] or ['0'])))"], correctOrder: [1,0,2,3,4,5,6], hint: "Read num then k; pop while stack top > current and k > 0" },
          { id: "stk-jumb-5", title: "Arrange: Celebrity Problem", description: "Find celebrity (known by all, knows none).", language: "python", lines: ["n = int(input())", "knows = [list(map(int,input().split())) for _ in range(n)]", "stack = list(range(n))", "while len(stack) > 1:", "    a, b = stack.pop(), stack.pop()", "    if knows[a][b]: stack.append(b)", "    else: stack.append(a)", "c = stack[0]", "if all(knows[i][c] for i in range(n) if i!=c) and not any(knows[c]):", "    print(c)", "else: print(-1)"], correctOrder: [0,1,2,3,4,5,6,7,8,9,10], hint: "Stack elimination then verify candidate" }
        ],
        missingCode: [
          { id: "stk-miss-1", title: "Complete: Tower of Hanoi", description: "Print moves for Tower of Hanoi.", language: "python", template: `def hanoi(n, src, dst, via):
    if n == ____: return
    hanoi(____, src, via, dst)
    print(f"Move disk {n} from {src} to {dst}")
    hanoi(____, via, dst, src)
hanoi(int(input()), 'A', 'C', 'B')`, blanks: ["0", "n-1", "n-1"], hints: ["Base case: 0 disks", "Move n-1 to via", "Move n-1 from via to dst"] },
          { id: "stk-miss-2", title: "Complete: Stack Using Two Queues", description: "Implement stack push using 2 queues.", language: "python", template: `from collections import deque
q1, q2 = deque(), deque()
def push(x):
    q2.append(____)
    while q1: q2.append(q1.popleft())
    q1, q2 = ____, q1`, blanks: ["x", "q2"], hints: ["Push to temp queue", "Swap q1 and q2"] },
          { id: "stk-miss-3", title: "Complete: Check Redundant Brackets", description: "Check if expression has redundant brackets.", language: "python", template: `stack = []
for c in s:
    if c != ')': stack.append(c)
    else:
        top = stack.____()
        has_op = False
        while top != '(':
            if top in '+-*/': has_op = ____
            top = stack.pop()
        if not ____: return True  # redundant
return False`, blanks: ["pop", "True", "has_op"], hints: ["Pop stack", "Found operator inside brackets", "No operator = redundant brackets"] },
          { id: "stk-miss-4", title: "Complete: Sort Stack Using Recursion", description: "Sort a stack using recursion.", language: "python", template: `def sort_stack(stack):
    if not ____: return
    top = stack.____()
    sort_stack(stack)
    insert_sorted(stack, top)

def insert_sorted(stack, val):
    if not stack or stack[-1] <= ____:
        stack.append(val); return
    top = stack.pop()
    insert_sorted(stack, ____)
    stack.append(top)`, blanks: ["stack", "pop()", "val", "val"], hints: ["Base case: empty stack", "Pop top element", "Insert in order", "Recurse with original val"] },
          { id: "stk-miss-5", title: "Complete: Implement Queue Using Stacks", description: "FIFO queue using two stacks.", language: "python", template: `in_stack, out_stack = [], []
def enqueue(x): in_stack.____(x)
def dequeue():
    if not out_stack:
        while ____: out_stack.append(in_stack.____())
    return out_stack.____()`, blanks: ["append", "in_stack", "pop()", "pop()"], hints: ["Push to in_stack", "Transfer while in_stack not empty", "Pop from in_stack", "Pop from out_stack"] }
        ],
        optimize: [
          { id: "stk-opt-1", title: "Optimize: Trapping Rainwater", scenario: "🌧️ Calculate water trapped between buildings after rain.", badCode: `# O(N²)
for i in range(1, n-1):
    max_l = max(height[:i+1])
    max_r = max(height[i:])
    water += min(max_l, max_r) - height[i]`, goodCode: `# O(N) two pointer
l, r = 0, n-1; ml = mr = 0; water = 0
while l <= r:
    if height[l] <= height[r]:
        if height[l] >= ml: ml = height[l]
        else: water += ml - height[l]
        l += 1
    else:
        if height[r] >= mr: mr = height[r]
        else: water += mr - height[r]
        r -= 1`, currentComplexity: "O(N²)", optimalComplexity: "O(N)", explanation: "Two-pointer eliminates need to recompute max repeatedly.", question: "What do ml and mr represent?", questionAnswer: "Maximum heights seen from left and right respectively up to current pointers." },
          { id: "stk-opt-2", title: "Optimize: Decode Nested String", scenario: "📦 Decode '3[a2[bc]]' → 'abcbcabcbcabcbc'.", badCode: `# Regex-based: O(N²) with repeated string operations
import re
while '[' in s:
    s = re.sub(r'(\\d+)\\[([a-z]*)\\]', lambda m: int(m.group(1))*m.group(2), s)`, goodCode: `# Stack-based: O(N) single pass
stk = []; curr = ''; k = 0
for c in s:
    if c.isdigit(): k = k*10 + int(c)
    elif c == '[': stk.append((curr, k)); curr=''; k=0
    elif c == ']': prev, num = stk.pop(); curr = prev + num*curr
    else: curr += c`, currentComplexity: "O(N²) with regex replacement", optimalComplexity: "O(N)", explanation: "Stack tracks context for nested brackets in single pass.", question: "What is stored in the stack for each '['?", questionAnswer: "Tuple of (string_so_far, repeat_count) before the bracket opened" },
          { id: "stk-opt-3", title: "Optimize: Score of Parentheses", scenario: "🎯 Calculate score: () = 1, AB = score(A)+score(B), (A) = 2*score(A).", badCode: `# Recursive O(N²) with string slicing
def score(s):
    if s == '()': return 1
    # find matching close for first open...
    # ... recurse on parts`, goodCode: `# O(N) stack depth tracking
stack = [0]
for c in s:
    if c == '(': stack.append(0)
    else:
        v = stack.pop()
        stack[-1] += max(2*v, 1)
print(stack[0])`, currentComplexity: "O(N²)", optimalComplexity: "O(N)", explanation: "Stack tracks accumulated score at each nesting level.", question: "What does stack[0] represent at the end?", questionAnswer: "The total score of the outermost level (the full expression)" },
          { id: "stk-opt-4", title: "Optimize: Validate Preorder BST", scenario: "🌳 Validate if sequence is valid BST preorder traversal.", badCode: `# O(N²) — reconstruct tree and verify
# build tree then check preorder matches`, goodCode: `# O(N) — monotonic stack
stack = []; min_limit = float('-inf')
for val in preorder:
    if val < min_limit: return False
    while stack and stack[-1] < val:
        min_limit = stack.pop()
    stack.append(val)
return True`, currentComplexity: "O(N²)", optimalComplexity: "O(N)", explanation: "Monotonic stack simulates BST property without building the tree.", question: "What does min_limit represent?", questionAnswer: "The minimum value that can appear (lower bound from the last right-turn in BST structure)" },
          { id: "stk-opt-5", title: "Optimize: Largest Rectangle of 1s in Binary Matrix", scenario: "🏗️ Find largest rectangle of 1s in binary matrix.", badCode: `# O(M²×N) — check all sub-rectangles
for r1 in range(m):
    for r2 in range(r1, m):
        # column sums for this row range
        # find max consecutive...`, goodCode: `# O(M×N) — histogram per row
for i in range(m):
    for j in range(n):
        hist[j] = hist[j]+1 if matrix[i][j]=='1' else 0
    max_area = max(max_area, largest_rect_histogram(hist))`, currentComplexity: "O(M²×N)", optimalComplexity: "O(M×N)", explanation: "Build cumulative histogram row by row, then use O(N) stack solution per row.", question: "How is the histogram updated for row i?", questionAnswer: "If matrix[i][j]='1', hist[j]+=1; else hist[j]=0. This gives consecutive 1s count above row i." }
        ]
      },

      "Queue": {
        objective: [
          { id: "q-obj-1", question: "A printer spools jobs in arrival order. This is best modeled as:", options: ["Stack", "Queue", "Priority Queue", "Deque"], answer: 1, explanation: "FIFO — first job submitted is first printed. Classic queue." },
          { id: "q-obj-2", question: "BFS uses a queue to ensure:", options: ["Depth-first exploration", "Level-by-level exploration", "Random order", "Reverse exploration"], answer: 1, explanation: "Queue's FIFO property ensures we process all nodes at depth D before depth D+1." },
          { id: "q-obj-3", question: "Circular queue solves which problem of linear queue?", options: ["Slow insertion", "Space wastage after dequeues", "Priority ordering", "Thread safety"], answer: 1, explanation: "After dequeues, front moves forward. Circular queue wraps rear around to reuse that space." },
          { id: "q-obj-4", question: "Deque (Double-ended queue) supports:", options: ["Insert/delete only at front", "Insert/delete only at rear", "Insert/delete at both ends", "Random access by index"], answer: 2, explanation: "Deque = Double Ended Queue — insertions and deletions at BOTH front and rear." },
          { id: "q-obj-5", question: "Finding sliding window maximum in O(N) uses a:", options: ["Stack", "Regular queue", "Monotonic deque", "Priority queue"], answer: 2, explanation: "Monotonic deque maintains decreasing order; pop from front when out of window, front is always max." }
        ],
        codeEditor: [
          { id: "q-code-1", title: "Hospital Queue System", difficulty: "Easy", scenario: "🏥 A hospital processes patients in arrival order. Simulate: add patients, treat (remove from front), show next. Process Q operations.", description: "Simulate queue with enqueue, dequeue, front operations.", constraints: "1 ≤ Q ≤ 10^5", starterCode: { python: `from collections import deque
q_ops = int(input())
queue = deque()
for _ in range(q_ops):
    op = input().split()
    if op[0] == 'enqueue': queue.append(op[1])
    elif op[0] == 'dequeue':
        if queue: queue.popleft()
        else: print("EMPTY")
    elif op[0] == 'front':
        print(queue[0] if queue else "EMPTY")` ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const q = parseInt(lines[0]);
const queue = [];
for (let i = 1; i <= q; i++) {
  const parts = lines[i].split(' ');
  if (parts[0] === 'enqueue') queue.push(parts[1]);
  else if (parts[0] === 'dequeue') { if (!queue.length) console.log('EMPTY'); else queue.shift(); }
  else if (parts[0] === 'front') console.log(queue.length ? queue[0] : 'EMPTY');
}`
            }, solutionCode: { python: `from collections import deque; n=int(input()); q=deque()
for _ in range(n):
    o=input().split()
    if o[0]=='enqueue': q.append(o[1])
    elif o[0]=='dequeue':
        if q: q.popleft()
        else: print("EMPTY")
    elif o[0]=='front': print(q[0] if q else "EMPTY")` }, testCases: [{ input: "5\nenqueue Alice\nenqueue Bob\nfront\ndequeue\nfront", expectedOutput: "Alice\nBob" }, { input: "2\ndequeue\nfront", expectedOutput: "EMPTY\nEMPY" }, { input: "3\nenqueue X\ndequeue\nfront", expectedOutput: "EMPTY" }, { input: "4\nenqueue A\nenqueue B\nenqueue C\nfront", expectedOutput: "A" }, { input: "3\nenqueue P\nfront\ndequeue", expectedOutput: "P" }] },
          { id: "q-code-2", title: "Sliding Window Maximum", difficulty: "Hard", scenario: "📊 A stock analysis tool finds maximum price in every window of K consecutive days.", description: "Print maximum element in each sliding window of size K.", constraints: "1 ≤ K ≤ N ≤ 10^5", starterCode: { python: `from collections import deque
n, k = map(int, input().split())
arr = list(map(int, input().split()))
dq = deque()
result = []
for i in range(n):
    while dq and dq[0] < i - k + 1: dq.popleft()
    while dq and arr[dq[-1]] < arr[i]: dq.pop()
    dq.append(i)
    if i >= k - 1: result.append(arr[dq[0]])
print(*result)` ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const [n, k] = lines[0].split(' ').map(Number);
const arr = lines[1].split(' ').map(Number);
const dq = [], result = [];
for (let i = 0; i < n; i++) {
  while (dq.length && dq[0] < i - k + 1) dq.shift();
  while (dq.length && arr[dq[dq.length-1]] < arr[i]) dq.pop();
  dq.push(i);
  if (i >= k - 1) result.push(arr[dq[0]]);
}
console.log(result.join(' '));`
            }, solutionCode: { python: `from collections import deque; n,k=map(int,input().split()); a=list(map(int,input().split())); dq=deque(); res=[]
for i in range(n):
    while dq and dq[0]<i-k+1: dq.popleft()
    while dq and a[dq[-1]]<a[i]: dq.pop()
    dq.append(i)
    if i>=k-1: res.append(a[dq[0]])
print(*res)` }, testCases: [{ input: "8 3\n1 3 -1 -3 5 3 6 7", expectedOutput: "3 3 5 5 6 7" }, { input: "5 2\n2 1 5 3 4", expectedOutput: "2 5 5 4" }, { input: "3 3\n4 3 11", expectedOutput: "11" }, { input: "4 1\n1 2 3 4", expectedOutput: "1 2 3 4" }, { input: "5 5\n9 3 7 1 8", expectedOutput: "9" }] },
          { id: "q-code-3", title: "First Non-Repeating in Stream", difficulty: "Medium", scenario: "📡 A live data stream processor shows the first non-repeating character at each step of processing.", description: "For each prefix of the stream, print first non-repeating char, or # if none.", constraints: "1 ≤ |s| ≤ 10^5", starterCode: { python: `from collections import Counter, deque
s = input()
freq = Counter()
q = deque()
for c in s:
    freq[c] += 1
    q.append(c)
    while q and freq[q[0]] > 1: q.popleft()
    print(q[0] if q else '#', end='')
print()` ,
              javascript: `const s = require('fs').readFileSync('/dev/stdin','utf8').trim();
const freq = {}, queue = [];
let out = '';
for (const c of s) {
  freq[c] = (freq[c] || 0) + 1;
  queue.push(c);
  while (queue.length && freq[queue[0]] > 1) queue.shift();
  out += queue.length ? queue[0] : '#';
}
console.log(out);`
            }, solutionCode: { python: `from collections import Counter, deque; s=input(); freq=Counter(); q=deque()
for c in s:
    freq[c]+=1; q.append(c)
    while q and freq[q[0]]>1: q.popleft()
    print(q[0] if q else '#',end='')
print()` }, testCases: [{ input: "aabc", expectedOutput: "#aab" }, { input: "aabbc", expectedOutput: "#a##c" }, { input: "geeksforgeeks", expectedOutput: "gggggggggggggg" }, { input: "a", expectedOutput: "a" }, { input: "aabb", expectedOutput: "#a##" }] },
          { id: "q-code-4", title: "BFS Shortest Path", difficulty: "Medium", scenario: "🗺️ A GPS finds shortest path in a city grid. Find minimum steps from source (1) to all nodes in an unweighted graph.", description: "BFS from node 1. Print distance to each node (1-indexed). -1 if unreachable.", constraints: "1 ≤ N,M ≤ 10^5", starterCode: { python: `from collections import deque
n, m = map(int, input().split())
adj = [[] for _ in range(n+1)]
for _ in range(m):
    u, v = map(int, input().split())
    adj[u].append(v); adj[v].append(u)
dist = [-1] * (n+1)
dist[1] = 0
q = deque([1])
while q:
    u = q.popleft()
    for v in adj[u]:
        if dist[v] == -1:
            dist[v] = dist[u] + 1
            q.append(v)
print(*dist[1:])` ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const [n, m] = lines[0].split(' ').map(Number);
const adj = Array.from({length: n + 1}, () => []);
for (let i = 1; i <= m; i++) {
  const [u, v] = lines[i].split(' ').map(Number);
  adj[u].push(v); adj[v].push(u);
}
const dist = new Array(n + 1).fill(-1);
dist[1] = 0;
const queue = [1];
while (queue.length) {
  const u = queue.shift();
  for (const v of adj[u]) {
    if (dist[v] === -1) { dist[v] = dist[u] + 1; queue.push(v); }
  }
}
console.log(dist.slice(1).join(' '));`
            }, solutionCode: { python: `from collections import deque; n,m=map(int,input().split()); adj=[[]for _ in range(n+1)]
for _ in range(m): u,v=map(int,input().split()); adj[u].append(v); adj[v].append(u)
d=[-1]*(n+1); d[1]=0; q=deque([1])
while q:
    u=q.popleft()
    for v in adj[u]:
        if d[v]==-1: d[v]=d[u]+1; q.append(v)
print(*d[1:])` }, testCases: [{ input: "5 5\n1 2\n1 3\n2 4\n3 4\n4 5", expectedOutput: "0 1 1 2 3" }, { input: "4 3\n1 2\n2 3\n3 4", expectedOutput: "0 1 2 3" }, { input: "3 1\n1 2", expectedOutput: "0 1 -1" }, { input: "2 0", expectedOutput: "0 -1" }, { input: "4 4\n1 2\n1 3\n2 4\n3 4", expectedOutput: "0 1 1 2" }] },
          { id: "q-code-5", title: "Rotten Oranges Multi-Source BFS", difficulty: "Hard", scenario: "🍊 A fruit warehouse manager tracks orange rot spread: each minute all fresh oranges adjacent to rotten ones become rotten. Find minutes until all rotten or -1.", description: "Multi-source BFS: 2=rotten, 1=fresh, 0=empty. Print min minutes or -1.", constraints: "1 ≤ M,N ≤ 500", starterCode: { python: `from collections import deque
m, n = map(int, input().split())
grid = [list(map(int, input().split())) for _ in range(m)]
q = deque(); fresh = 0
for i in range(m):
    for j in range(n):
        if grid[i][j] == 2: q.append((i, j, 0))
        elif grid[i][j] == 1: fresh += 1
time = 0
while q:
    r, c, t = q.popleft(); time = t
    for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
        nr, nc = r+dr, c+dc
        if 0<=nr<m and 0<=nc<n and grid[nr][nc]==1:
            grid[nr][nc] = 2; fresh -= 1; q.append((nr, nc, t+1))
print(time if fresh == 0 else -1)` ,
              javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
const [m, n] = lines[0].split(' ').map(Number);
const grid = [];
for (let i = 0; i < m; i++) grid.push(lines[i + 1].split(' ').map(Number));
const queue = []; let fresh = 0;
for (let i = 0; i < m; i++)
  for (let j = 0; j < n; j++) {
    if (grid[i][j] === 2) queue.push([i, j, 0]);
    else if (grid[i][j] === 1) fresh++;
  }
let time = 0;
while (queue.length) {
  const [r, c, t] = queue.shift(); time = t;
  for (const [dr, dc] of [[-1,0],[1,0],[0,-1],[0,1]]) {
    const nr = r+dr, nc = c+dc;
    if (nr>=0&&nr<m&&nc>=0&&nc<n&&grid[nr][nc]===1) {
      grid[nr][nc]=2; fresh--; queue.push([nr,nc,t+1]);
    }
  }
}
console.log(fresh===0 ? time : -1);`
            }, solutionCode: { python: `from collections import deque; m,n=map(int,input().split()); g=[list(map(int,input().split()))for _ in range(m)]; q=deque(); f=0
for i in range(m):
    for j in range(n):
        if g[i][j]==2: q.append((i,j,0))
        elif g[i][j]==1: f+=1
t=0
while q:
    r,c,tm=q.popleft(); t=tm
    for dr,dc in [(-1,0),(1,0),(0,-1),(0,1)]:
        nr,nc=r+dr,c+dc
        if 0<=nr<m and 0<=nc<n and g[nr][nc]==1: g[nr][nc]=2; f-=1; q.append((nr,nc,tm+1))
print(t if f==0 else -1)` }, testCases: [{ input: "3 3\n2 1 1\n1 1 0\n0 1 1", expectedOutput: "4" }, { input: "3 3\n2 1 1\n0 1 1\n1 0 1", expectedOutput: "-1" }, { input: "1 1\n0", expectedOutput: "0" }, { input: "2 2\n2 2\n2 2", expectedOutput: "0" }, { input: "2 2\n1 1\n1 2", expectedOutput: "2" }] }
        ],
        jumbledCode: [
          { id: "q-jumb-1", title: "Arrange: Level Order Tree Traversal", description: "BFS level order traversal of binary tree.", language: "python", lines: ["from collections import deque", "q = deque([root])", "while q:", "    level_size = len(q)", "    level = []", "    for _ in range(level_size):", "        node = q.popleft()", "        level.append(node.val)", "        if node.left: q.append(node.left)", "        if node.right: q.append(node.right)", "    print(*level)"], correctOrder: [0,1,2,3,4,5,6,7,8,9,10], hint: "BFS: process level by level using queue size" },
          { id: "q-jumb-2", title: "Arrange: Josephus Problem", description: "Josephus circle elimination.", language: "python", lines: ["from collections import deque", "n, k = map(int, input().split())", "circle = deque(range(1, n+1))", "while len(circle) > 1:", "    circle.rotate(-(k-1))", "    circle.popleft()", "print(circle[0])"], correctOrder: [0,1,2,3,4,5,6], hint: "Rotate k-1, then remove front" },
          { id: "q-jumb-3", title: "Arrange: Queue Reversal", description: "Reverse elements of a queue using stack.", language: "python", lines: ["from collections import deque", "q = deque(map(int, input().split()))", "stack = list(q)", "stack.reverse()", "print(*stack)"], correctOrder: [0,1,2,3,4], hint: "Use list as stack, reverse it" },
          { id: "q-jumb-4", title: "Arrange: Generate Binary Numbers", description: "Generate first N binary numbers using queue.", language: "python", lines: ["from collections import deque", "n = int(input())", "q = deque(['1'])", "for _ in range(n):", "    front = q.popleft()", "    print(front)", "    q.append(front + '0')", "    q.append(front + '1')"], correctOrder: [0,1,2,3,4,5,6,7], hint: "Start with '1', expand by appending 0 and 1" },
          { id: "q-jumb-5", title: "Arrange: Zigzag Level Order", description: "Print tree levels alternately left-right, right-left.", language: "python", lines: ["left_to_right = True", "q = deque([root])", "while q:", "    size = len(q); level = deque()", "    for _ in range(size):", "        node = q.popleft()", "        if left_to_right: level.append(node.val)", "        else: level.appendleft(node.val)", "        if node.left: q.append(node.left)", "        if node.right: q.append(node.right)", "    print(*level); left_to_right = not left_to_right"], correctOrder: [0,1,2,3,4,5,6,7,8,9,10,11], hint: "Flag controls append vs appendleft in level deque" }
        ],
        missingCode: [
          { id: "q-miss-1", title: "Complete: Circular Queue", description: "Implement circular queue enqueue.", language: "python", template: `class CircularQueue:
    def __init__(self, k):
        self.q = [None] * k
        self.k = k; self.front = self.rear = -1; self.size = 0
    def enqueue(self, val):
        if self.size == self.____: return False
        if self.front == -1: self.front = 0
        self.rear = (self.rear + 1) % self.____
        self.q[self.rear] = ____
        self.size += 1; return True`, blanks: ["k", "k", "val"], hints: ["Check if full", "Circular increment", "Store value"] },
          { id: "q-miss-2", title: "Complete: Task Scheduler", description: "Round-robin CPU task scheduling.", language: "python", template: `from collections import deque
tasks = deque(map(int, input().split()))
quantum = int(input()); time = 0
while tasks:
    task = tasks.____()
    if task <= ____:
        time += task
    else:
        time += quantum
        tasks.append(task - ____)
print(time)`, blanks: ["popleft()", "quantum", "quantum"], hints: ["Dequeue from front", "Task finishes if ≤ quantum", "Remaining time after quantum"] },
          { id: "q-miss-3", title: "Complete: Interleave Queue Halves", description: "Interleave first half with second half of queue.", language: "python", template: `n = len(q)
half = n // ____
temp = []
for _ in range(half): temp.append(q.____())
while temp:
    q.append(temp.____())
    q.append(q.____())`, blanks: ["2", "popleft()", "pop(0)", "popleft()"], hints: ["Half size", "Move first half to temp", "Pop from front of temp", "Move one from rear of queue"] },
          { id: "q-miss-4", title: "Complete: Priority Queue Min Heap", description: "Push and pop from min heap.", language: "python", template: `import heapq
heap = []
for op in operations:
    if op[0] == 'push': heapq.____(____, int(op[1]))
    elif op[0] == 'pop': print(heapq.____(____ ))`, blanks: ["heappush", "heap", "heappop", "heap"], hints: ["Heapq push function", "Pass heap first", "Heapq pop function", "Pass heap to pop"] },
          { id: "q-miss-5", title: "Complete: Reconstruct Queue by Height", description: "People at positions by height and k-count.", language: "python", template: `people.sort(key=lambda x: (____[0], ____[1]))
result = []
for p in people:
    result.insert(p[____], p)
return result`, blanks: ["-x", "x", "1"], hints: ["Sort by height descending", "Then by k ascending", "Insert at position k"] }
        ],
        optimize: [
          { id: "q-opt-1", title: "Optimize: BFS on Large Graph", scenario: "🗺️ BFS on social network with 10M users.", badCode: `# Using list as queue — O(N²) total
visited = set(); q = [start]
while q:
    node = q.pop(0)  # O(N) shift!
    for nb in graph[node]:
        if nb not in visited:
            visited.add(nb); q.append(nb)`, goodCode: `# deque popleft O(1) total O(N+E)
from collections import deque
visited = set(); q = deque([start])
while q:
    node = q.popleft()  # O(1)
    for nb in graph[node]:
        if nb not in visited:
            visited.add(nb); q.append(nb)`, currentComplexity: "O(N²) due to list.pop(0)", optimalComplexity: "O(N+E)", explanation: "list.pop(0) is O(N) — shifts all elements. deque.popleft() is O(1).", question: "How much faster is deque vs list for 1M node BFS?", questionAnswer: "List: ~N² = 10^12 ops. Deque: ~N = 10^6 ops. About 1 million times faster." },
          { id: "q-opt-2", title: "Optimize: Find Minimum in Sliding Window", scenario: "📊 Find minimum in each K-size window.", badCode: `# O(N×K)
for i in range(n-k+1):
    print(min(arr[i:i+k]))`, goodCode: `# O(N) monotonic deque
from collections import deque
dq = deque()
for i in range(n):
    while dq and dq[0] < i-k+1: dq.popleft()
    while dq and arr[dq[-1]] > arr[i]: dq.pop()
    dq.append(i)
    if i >= k-1: print(arr[dq[0]])`, currentComplexity: "O(N×K)", optimalComplexity: "O(N)", explanation: "Monotonic deque maintains minimum as front, elements enter/exit at most once.", question: "What order does the deque maintain (min window)?", questionAnswer: "Increasing order from front to back — front is always the minimum in current window." },
          { id: "q-opt-3", title: "Optimize: Multi-Source BFS", scenario: "🍊 Multiple rotten oranges spread simultaneously.", badCode: `# Single-source BFS repeated — O(R × N × M)
for rotten in rotten_list:
    bfs_from(rotten)  # redundant revisiting`, goodCode: `# Multi-source BFS — O(N×M)
q = deque()
for i,j in rotten_cells: q.append((i,j,0))
# Single BFS from all sources simultaneously`, currentComplexity: "O(R × N × M)", optimalComplexity: "O(N×M)", explanation: "Initialize queue with ALL sources, single BFS naturally handles simultaneous spread.", question: "What is the key insight of multi-source BFS?", questionAnswer: "Adding all sources to queue before starting treats them all as 'distance 0', naturally computing min distance from ANY source." },
          { id: "q-opt-4", title: "Optimize: Number of Islands BFS", scenario: "🏝️ Count islands using BFS.", badCode: `# Multiple BFS with copy — O(N²M²)
for i in range(m):
    for j in range(n):
        if grid[i][j]=='1':
            grid_copy = [r[:] for r in grid]  # O(MN) copy!
            bfs(grid_copy, i, j)`, goodCode: `# Mark in-place no copy — O(N×M)
for i in range(m):
    for j in range(n):
        if grid[i][j]=='1':
            count += 1
            grid[i][j]='0'  # mark in-place
            bfs(grid, i, j)  # marks all connected '1's as '0'`, currentComplexity: "O(N²M²)", optimalComplexity: "O(N×M)", explanation: "Mark visited cells in-place; no copy needed.", question: "Side effect of in-place marking?", questionAnswer: "Modifies input grid — if original must be preserved, copy once before algorithm O(NM) instead of per-BFS." },
          { id: "q-opt-5", title: "Optimize: 0-1 BFS vs Dijkstra", scenario: "⚡ Graph with edge weights only 0 or 1.", badCode: `# Dijkstra O((V+E) log V) — overkill for 0-1 weights
import heapq
heap = [(0, start)]
while heap: dist, u = heapq.heappop(heap); ...`, goodCode: `# 0-1 BFS with deque — O(V+E)
from collections import deque
q = deque([(0, start)])
while q:
    d, u = q.popleft()
    for v, w in graph[u]:
        if d+w < dist[v]:
            dist[v] = d+w
            if w == 0: q.appendleft((dist[v], v))  # front
            else: q.append((dist[v], v))  # back`, currentComplexity: "O((V+E) log V)", optimalComplexity: "O(V+E)", explanation: "0-weight edges go to front (free moves), 1-weight go to back. Deque replaces heap.", question: "Why can 0-weight edges go to the front of the deque?", questionAnswer: "They don't increase distance, so the node is as 'cheap' as the current node — still at same 'level' in terms of cost." }
        ]
      }
    }
  }
};

module.exports = DSA_QUESTIONS;
