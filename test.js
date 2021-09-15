/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  let slow = head,
    fast = head;

  while (fast && fast.next) {
    // 快慢指针找到第一次相交点，若fast到null，则表示不存在环
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      let dummy = head;

      // 找到入环点
      while (dummy !== slow) {
        dummy = dummy.next;
        slow = slow.next;
      }

      return dummy;
    }
  }

  return null;
};
