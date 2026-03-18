def remove_duplicates(nums: list[int]) -> int:
    """
    LeetCode 26: Remove Duplicates from Sorted Array

    Problem: Given a sorted array, remove duplicates in-place so each element
    appears only once. Return the new length.

    Approach: Two-pointer technique. One pointer (write) tracks where to place
    the next unique element, another pointer (read) scans through the array.

    Key insight: In a sorted array, duplicates are adjacent.

    Time: O(n) - single pass
    Space: O(1) - in-place modification
    """
    # Edge case: empty array
    if not nums:
        return 0

    write = 1  # Position for next unique element

    for read in range(1, len(nums)):
        # If current element differs from previous, it's unique
        if nums[read] != nums[read - 1]:
            nums[write] = nums[read]
            write += 1
        # If same as previous, skip (it's a duplicate)

    return write  # New length


# Test cases
if __name__ == "__main__":
    arr1 = [1, 1, 2]
    print(remove_duplicates(arr1))  # 2
    print(arr1)  # [1, 2, 2]

    arr2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
    print(remove_duplicates(arr2))  # 5
    print(arr2)  # [0, 1, 2, 3, 4, ...]
