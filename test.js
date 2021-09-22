/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode[]}
 */

var splitListToParts = function (head, k) {
  const len = getLength(head);
  const subListLen = Math.floor(len / k);
  const remain = len % k;

  let res = [];

  for (let i = 0; i < k; i++) {
    let count = i < remain ? subListLen + 1 : subListLen,
      pre = head,
      dummy = head;

    while (count-- && head) {
      pre = head;
      head = head.next;
    }
    if (pre) {
      pre.next = null;
    }
    res.push(dummy);
  }

  return res;
};

function getLength(head) {
  let len = 0;
  while (head) {
    head = head.next;
    len++;
  }
  return len;
}

function getTop(head, count) {
  let dummy = head,
    pre = head;
  while (count-- && head) {
    pre = head;
    head = head.next;
  }

  pre.next = null;

  return { dummy, newHead: head };
}
