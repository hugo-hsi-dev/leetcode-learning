def max_sub_array(nums: list[int]) -> int:
    """
    LeetCode 53: Maximum Subarray

    Problem: Find the contiguous subarray with the largest sum.

    Approach: Kadane's Algorithm.
    - Keep a running sum of the current subarray
    - If the running sum becomes negative, reset it to 0 (start fresh)
    - Track the maximum sum seen so far

    Key insight: A negative sum will never help maximize the total.

    Time: O(n) - single pass
    Space: O(1) - only two variables
    """
    max_sum = nums[0]  # Track the best sum found
    current_sum = 0  # Running sum of current subarray

    for num in nums:
        current_sum += num
        max_sum = max(max_sum, current_sum)

        # If current sum is negative, reset (start fresh)
        if current_sum < 0:
            current_sum = 0

    return max_sum


def max_sub_array_clean(nums: list[int]) -> int:
    """
    Alternative: cleaner version that handles all-negative arrays naturally.
    """
    max_sum = nums[0]
    current_sum = nums[0]

    for i in range(1, len(nums)):
        # Either extend the previous subarray or start fresh
        current_sum = max(nums[i], current_sum + nums[i])
        max_sum = max(max_sum, current_sum)

    return max_sum


# Test cases
if __name__ == "__main__":
    print(max_sub_array([-2, 1, -3, 4, -1, 2, 1, -5, 4]))  # 6
    print(max_sub_array([1]))  # 1
    print(max_sub_array([5, 4, -1, 7, 8]))  # 23
    print(max_sub_array([-1, -2, -3]))  # -1
