def move_zeroes(nums: list[int]) -> None:
    """
    LeetCode 283: Move Zeroes

    Problem: Move all zeros to the end of the array while maintaining
    the order of non-zero elements. Do this in-place.

    Approach: Two-pointer technique.
    - write: position for next non-zero
    - read: scans through array

    Time: O(n) - single pass for non-zeros + second pass for zeros
    Space: O(1) - in-place modification
    """
    write = 0  # Position for next non-zero

    # First pass: move all non-zeros to the front
    for read in range(len(nums)):
        if nums[read] != 0:
            nums[write] = nums[read]
            write += 1

    # Second pass: fill remaining positions with zeros
    for i in range(write, len(nums)):
        nums[i] = 0


def move_zeroes_swap(nums: list[int]) -> None:
    """
    Alternative: single pass with swapping.
    More intuitive: swap each non-zero with the write position.
    """
    write = 0  # Position for next non-zero

    for read in range(len(nums)):
        if nums[read] != 0:
            # Swap nums[read] and nums[write]
            nums[write], nums[read] = nums[read], nums[write]
            write += 1


# Test cases
if __name__ == "__main__":
    arr1 = [0, 1, 0, 3, 12]
    move_zeroes(arr1)
    print(arr1)  # [1, 3, 12, 0, 0]

    arr2 = [0, 0, 0, 1]
    move_zeroes(arr2)
    print(arr2)  # [1, 0, 0, 0]

    arr3 = [1, 2, 3]
    move_zeroes(arr3)
    print(arr3)  # [1, 2, 3]
