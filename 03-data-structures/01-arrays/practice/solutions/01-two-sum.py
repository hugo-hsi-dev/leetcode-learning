def two_sum(nums: list[int], target: int) -> list[int]:
    """
    LeetCode 1: Two Sum

    Problem: Given an array of integers nums and an integer target,
    return indices of the two numbers that add up to target.

    Approach: Use a hash map (dict) to store numbers we've seen and their indices.
    For each number, check if (target - num) exists in the map.

    Time: O(n) - single pass through the array
    Space: O(n) - in worst case, we store all elements in the dict
    """
    seen: dict[int, int] = {}  # value -> index

    for i, num in enumerate(nums):
        complement = target - num

        if complement in seen:
            # Found the pair!
            return [seen[complement], i]

        # Store current number and its index
        seen[num] = i

    # According to problem, exactly one solution exists
    return []


# Test cases
if __name__ == "__main__":
    print(two_sum([2, 7, 11, 15], 9))  # [0, 1]
    print(two_sum([3, 2, 4], 6))  # [1, 2]
    print(two_sum([3, 3], 6))  # [0, 1]


# Brute Force Alternative (O(n^2)):
#
# def two_sum_brute(nums: list[int], target: int) -> list[int]:
#     for i in range(len(nums)):
#         for j in range(i + 1, len(nums)):
#             if nums[i] + nums[j] == target:
#                 return [i, j]
#     return []
#
# This works but is O(n^2). The hash map approach is preferred for O(n).
