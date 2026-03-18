def max_profit(prices: list[int]) -> int:
    """
    LeetCode 121: Best Time to Buy and Sell Stock

    Problem: Given prices where prices[i] is the stock price on day i,
    find the maximum profit from buying on one day and selling on a later day.

    Approach: Track the minimum price seen so far.
    For each day, calculate potential profit (price - min_so_far) and
    update max profit if it's higher.

    Key insight: The best buy day must come before the sell day.
    So for each potential sell day, we want to know the minimum price before it.

    Time: O(n) - single pass
    Space: O(1) - only two variables
    """
    if not prices:
        return 0

    min_price = prices[0]  # Minimum price seen so far
    max_profit = 0  # Maximum profit achievable

    for price in prices:
        # Update the minimum price (potential buy day)
        min_price = min(min_price, price)

        # Calculate profit if we sold today (having bought at min price)
        potential_profit = price - min_price

        # Update max profit if this is better
        max_profit = max(max_profit, potential_profit)

    return max_profit


# Test cases
if __name__ == "__main__":
    print(max_profit([7, 1, 5, 3, 6, 4]))  # 5
    print(max_profit([7, 6, 4, 3, 1]))  # 0
    print(max_profit([1, 2, 3, 4, 5]))  # 4
    print(max_profit([2, 4, 1]))  # 2
