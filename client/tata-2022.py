import pandas as pd
import numpy as np

# Create DataFrames for Income Statement
income_statement = pd.DataFrame({
    'Particulars': [
        'Revenue from Operations',
        'Other Income',
        'Total Income',
        'Expenses',
        'Cost of Power Purchased',
        'Cost of Fuel',
        'Transmission Charges',
        'Raw Material Consumed',
        'Purchase of Finished Goods and Spares',
        '(Increase)/Decrease in Stock-in-Trade and Work in Progress',
        'Employee Benefits Expense (Net)',
        'Finance Costs',
        'Depreciation and Amortisation Expenses',
        'Other Expenses',
        'Total Expenses',
        'Profit/(Loss) Before Movement in Regulatory Deferral Balances, Exceptional Items, Tax and Share of Net Profit of Associates and Joint Ventures accounted for using the Equity Method',
        'Add/(Less): Net Movement in Regulatory Deferral Balances',
        'Add/(Less): Deferred Tax Recoverable/(Payable)',
        'Profit/(Loss) Before Exceptional Items, Tax and Share of Net Profit of Associates and Joint Ventures accounted for using the Equity Method',
        'Share of Net Profit of Associates and Joint Ventures accounted for using the Equity Method',
        'Profit/(Loss) Before Exceptional Items and Tax',
        'Add/(Less): Exceptional Items: Provision for Impairment of Investment',
        'Add/(Less): Exceptional Items: Standby Litigation',
        'Profit/(Loss) Before Tax for the Year from Continuing Operations',
        'Tax Expense/(Credit): Current Tax',
        'Tax Expense/(Credit): Current Tax in respect of earlier years',
        'Tax Expense/(Credit): Deferred Tax',
        'Tax Expense/(Credit): Deferred Tax relating to earlier years',
        'Tax Expense/(Credit): Remeasurement of Deferred Tax on account of New Tax Regime (net)',
        'Tax Expense/(Credit): Total',
        'Profit/(Loss) for the Year from Continuing Operations',
        'Profit/(Loss) before tax from Discontinued Operations',
        'Impairment Loss related to Discontinued Operations on remeasurement at Fair Value',
        'Tax Expense/(Credit) of Discontinued Operations',
        'Profit/(Loss) for the Year from Discontinued Operations',
        'Profit/(Loss) for the Year',
        'Total Comprehensive Income for the Year'
    ],
    'FY2021-22 (₹ crore)': [
        42815.67, 919.96, 43735.63, np.nan,
        14640.62, 8290.92, 1018.19, 3832.83,
        49.11, -199.22, 3611.63, 3859.02,
        3122.20, 4060.42, 42285.72, 1449.91,
        -380.42, 140.95, 1210.44,
        1942.83, 3153.27, -150.27,
        0, 3003.00, 580.30,
        -105.11, 133.31, -588.56,
        359.62, 379.56, 2623.44,
        0, -467.83, 0,
        -467.83, 2155.61, 2629.02
    ],
    'FY2020-21 (₹ crore)': [
        32703.31, 439.24, 33142.55, np.nan,
        8334.41, 9074.96, 504.60, 2628.19,
        28.89, 0.41, 2316.67, 4010.39,
        2744.94, 2812.48, 32455.94, 686.61,
        454.22, 81.80, 1222.63,
        873.39, 2096.02, 0,
        -109.29, 1986.73, 647.57,
        0, -145.69, 0,
        0, 501.88, 1484.85,
        -59.85, -160.00, -173.65,
        -46.20, 1438.65, 1058.99
    ]
})

# Create DataFrame for Balance Sheet
balance_sheet = pd.DataFrame({
    'Particulars': [
        'ASSETS',
        'Non-Current Assets',
        'Property, Plant and Equipments',
        'Right of Use Assets',
        'Capital Work-in-Progress',
        'Goodwill',
        'Other Intangible Assets',
        'Investments accounted for using the Equity Method',
        'Financial Assets: Other Investments',
        'Financial Assets: Trade Receivables',
        'Financial Assets: Loans',
        'Financial Assets: Finance Lease Receivables',
        'Financial Assets: Other Financial Assets',
        'Non-current Tax Assets (Net)',
        'Deferred Tax Assets (Net)',
        'Other Non-current Assets',
        'Total Non-current Assets',
        'Current Assets',
        'Inventories',
        'Financial Assets: Investments',
        'Financial Assets: Trade Receivables',
        'Financial Assets: Unbilled Revenue',
        'Financial Assets: Cash and Cash Equivalents',
        'Financial Assets: Bank Balances other than above',
        'Financial Assets: Loans',
        'Financial Assets: Finance Lease Receivables',
        'Financial Assets: Other Financial Assets',
        'Current Tax Assets (Net)',
        'Other Current Assets',
        'Total Current Assets',
        'Assets Classified as Held For Sale',
        'Total Assets before Regulatory Deferral Account',
        'Regulatory Deferral Account - Assets',
        'TOTAL ASSETS',
        'EQUITY AND LIABILITIES',
        'Equity',
        'Equity Share Capital',
        'Unsecured Perpetual Securities',
        'Other Equity',
        'Equity attributable to Shareholders of the Company',
        'Non-controlling Interests',
        'Total Equity',
        'Non-Current Liabilities',
        'Financial Liabilities: Borrowings',
        'Financial Liabilities: Lease Liabilities',
        'Financial Liabilities: Trade Payables',
        'Financial Liabilities: Other Financial Liabilities',
        'Non-current Tax Liabilities (Net)',
        'Deferred Tax Liabilities (Net)',
        'Provisions',
        'Other Non-current Liabilities',
        'Total Non-Current Liabilities',
        'Current Liabilities',
        'Financial Liabilities: Borrowings',
        'Financial Liabilities: Lease Liabilities',
        'Financial Liabilities: Trade Payables',
        'Financial Liabilities: Other Financial Liabilities',
        'Current Tax Liabilities (Net)',
        'Provisions',
        'Other Current Liabilities',
        'Total Current Liabilities',
        'Liabilities directly associated with Assets Classified as Held For Sale',
        'Total Liabilities before Regulatory Deferral Account',
        'Regulatory Deferral Account - Liability',
        'TOTAL EQUITY AND LIABILITIES'
    ],
    'As at March 31, 2022 (₹ crore)': [
        np.nan, np.nan,
        50502.96, 3661.99, 4635.10, 1858.31, 1366.18, 12580.00,
        1169.81, 685.78, 3.45, 588.69, 1684.53, 520.54, 334.60, 1849.82,
        81441.76, np.nan,
        4231.52, 410.52, 5979.74, 2285.57, 3077.24, 3563.46,
        9.34, 46.91, 501.45, 0.01, 1479.67,
        21585.43, 3046.83, 106074.02, 6810.57, 112884.59,
        np.nan, np.nan,
        319.56, 0, 22122.00, 22441.56,
        3586.90, 26028.46, np.nan,
        32729.70, 3207.79, 0, 1156.56, 3.03, 1033.30, 1218.18, 8139.29,
        47487.85, np.nan,
        14860.30, 397.33, 10459.60, 9631.96, 147.00, 344.82, 2779.08,
        38620.09, 113.56, 86221.50, 634.63, 112884.59
    ],
    'As at March 31, 2021 (₹ crore)': [
        np.nan, np.nan,
        45356.46, 3682.27, 3270.26, 1794.57, 1345.85, 11920.63,
        728.88, 604.71, 4.60, 598.61, 1919.25, 359.83, 184.02, 1459.24,
        73229.18, np.nan,
        1885.62, 499.54, 5200.08, 1591.14, 3669.62, 2201.05,
        7.63, 41.45, 329.61, 0, 914.04,
        16339.78, 3047.46, 92616.42, 6222.44, 98838.86,
        np.nan, np.nan,
        319.56, 1500.00, 20502.70, 22322.26,
        2927.30, 25249.56, np.nan,
        30044.85, 3142.48, 1.67, 1371.00, 3.03, 976.15, 667.27, 5987.06,
        42193.51, np.nan,
        13125.79, 394.83, 7146.41, 7647.70, 198.38, 163.31, 2480.66,
        31157.08, 139.78, 73490.37, 98.93, 98838.86
    ]
})

# Create DataFrame for Cash Flow Statement
cash_flow = pd.DataFrame({
    'Particulars': [
        'A. Cash flow from operating activities',
        'Profit/(Loss) before tax from Continuing Operations',
        'Profit/(Loss) before tax from Discontinued Operations',
        'Adjustments to reconcile Profit Before Tax to Net Cash Flows:',
        'Depreciation and Amortisation Expense',
        'Other adjustments',
        'Adjustments for (increase) / decrease in Operating Assets:',
        'Inventories',
        'Trade Receivables',
        'Other Assets',
        'Adjustments for increase / (decrease) in Operating Liabilities:',
        'Trade Payables',
        'Other Liabilities',
        'Cash Flow from/(used in) Operations',
        'Income-tax Paid - (net of refund received)',
        'Net Cash Flows from/(used in) Operating Activities',
        'B. Cash Flow from Investing Activities',
        'Capital expenditure on Property, Plant and Equipment',
        'Proceeds from sale of Property, Plant and Equipment',
        'Other investing activities',
        'Net Cash Flow from/(used in) Investing Activities',
        'C. Cash Flow from Financing Activities',
        'Proceeds from Issue of Shares',
        'Redemption of Unsecured Perpetual Securities',
        'Proceeds from Non-current Borrowings',
        'Repayment of Non-current Borrowings',
        'Proceeds/(repayment) from Current Borrowings (Net)',
        'Finance Cost Paid',
        'Payment of Lease Liability',
        'Dividend Paid',
        'Distribution on Unsecured Perpetual Securities',
        'Net Cash Flow from/(used in) Financing Activities',
        'Net Increase in Cash and Cash Equivalents',
        'Cash and Cash Equivalents as at 1st April (Opening Balance)',
        'Cash and Cash Equivalents as at 31st March (Closing Balance)'
    ],
    'FY2021-22 (₹ crore)': [
        np.nan, 3003.00, -467.83, np.nan,
        3122.20, 1918.06, np.nan,
        -2308.21, -887.56, -1478.17, np.nan,
        3221.69, 1746.60, 7387.47, -694.74, 6692.73, np.nan,
        -7267.86, 34.91, 956.38, -6276.57, np.nan,
        11.33, -1500.00, 11473.88, -5684.28, -1632.59,
        -3555.18, -383.85, -558.51, -100.26, -1183.20,
        -767.04, 3569.96, 2829.02
    ],
    'FY2020-21 (₹ crore)': [
        np.nan, 1986.73, -219.85, np.nan,
        2744.94, 2958.79, np.nan,
        -93.26, -1103.76, -1329.59, np.nan,
        1709.92, 2787.37, 8792.15, -447.03, 8345.12, np.nan,
        -3335.79, 1549.09, 2454.30, 667.60, np.nan,
        2996.06, 0, 5602.19, -7453.61, -4121.95,
        -3731.42, -351.78, -526.29, -171.24, -7602.88,
        1409.84, 1834.39, 3569.96
    ]
})

# Create DataFrame for Equity changes
equity_changes = pd.DataFrame({
    'Particulars': [
        'Equity Share Capital',
        'Balance as at April 1, 2020',
        'Issued during the year',
        'Balance as at March 31, 2021',
        'Issued during the year',
        'Balance as at March 31, 2022',
        'Unsecured Perpetual Securities',
        'Balance as at April 1, 2020',
        'Issued during the year',
        'Balance as at March 31, 2021',
        'Redeemed during the year',
        'Balance as at March 31, 2022'
    ],
    'No. of Shares/Securities': [
        np.nan, 270.48, 49.06, 319.54, 0, 319.54,
        np.nan, 15000, 0, 15000, 15000, 0
    ],
    'Amount (₹ crore)': [
        np.nan, 270.50, 49.06, 319.56, 0, 319.56,
        np.nan, 1500.00, 0, 1500.00, 1500.00, 0
    ]
})

# Create a function to calculate financial ratios
def calculate_ratios(income_df, balance_df, cash_flow_df):
    ratios = {
        'Liquidity Ratios': {},
        'Leverage Ratios': {},
        'Turnover Ratios': {},
        'Profitability Ratios': {},
        'DuPont Analysis': {}
    }
    
    # Extract required data for calculations - FY 2022
    current_assets_2022 = balance_df.loc[balance_df['Particulars'] == 'Total Current Assets', 'As at March 31, 2022 (₹ crore)'].values[0]
    current_liabilities_2022 = balance_df.loc[balance_df['Particulars'] == 'Total Current Liabilities', 'As at March 31, 2022 (₹ crore)'].values[0]
    inventory_2022 = balance_df.loc[balance_df['Particulars'] == 'Inventories', 'As at March 31, 2022 (₹ crore)'].values[0]
    cash_equivalents_2022 = balance_df.loc[balance_df['Particulars'] == 'Financial Assets: Cash and Cash Equivalents', 'As at March 31, 2022 (₹ crore)'].values[0]
    total_assets_2022 = balance_df.loc[balance_df['Particulars'] == 'TOTAL ASSETS', 'As at March 31, 2022 (₹ crore)'].values[0]
    total_equity_2022 = balance_df.loc[balance_df['Particulars'] == 'Total Equity', 'As at March 31, 2022 (₹ crore)'].values[0]
    total_debt_2022 = (
        balance_df.loc[balance_df['Particulars'] == 'Financial Liabilities: Borrowings', 'As at March 31, 2022 (₹ crore)'].values[0] +
        balance_df.loc[balance_df['Particulars'] == 'Financial Liabilities: Borrowings', 'As at March 31, 2022 (₹ crore)'].values[1]
    )
    revenue_2022 = income_df.loc[income_df['Particulars'] == 'Revenue from Operations', 'FY2021-22 (₹ crore)'].values[0]
    net_income_2022 = income_df.loc[income_df['Particulars'] == 'Profit/(Loss) for the Year', 'FY2021-22 (₹ crore)'].values[0]
    ebit_2022 = (
        income_df.loc[income_df['Particulars'] == 'Profit/(Loss) Before Exceptional Items and Tax', 'FY2021-22 (₹ crore)'].values[0] +
        income_df.loc[income_df['Particulars'] == 'Finance Costs', 'FY2021-22 (₹ crore)'].values[0]
    )
    interest_expense_2022 = income_df.loc[income_df['Particulars'] == 'Finance Costs', 'FY2021-22 (₹ crore)'].values[0]
    
    # Extract required data for calculations - FY 2021
    current_assets_2021 = balance_df.loc[balance_df['Particulars'] == 'Total Current Assets', 'As at March 31, 2021 (₹ crore)'].values[0]
    current_liabilities_2021 = balance_df.loc[balance_df['Particulars'] == 'Total Current Liabilities', 'As at March 31, 2021 (₹ crore)'].values[0]
    inventory_2021 = balance_df.loc[balance_df['Particulars'] == 'Inventories', 'As at March 31, 2021 (₹ crore)'].values[0]
    cash_equivalents_2021 = balance_df.loc[balance_df['Particulars'] == 'Financial Assets: Cash and Cash Equivalents', 'As at March 31, 2021 (₹ crore)'].values[0]
    total_assets_2021 = balance_df.loc[balance_df['Particulars'] == 'TOTAL ASSETS', 'As at March 31, 2021 (₹ crore)'].values[0]
    total_equity_2021 = balance_df.loc[balance_df['Particulars'] == 'Total Equity', 'As at March 31, 2021 (₹ crore)'].values[0]
    total_debt_2021 = (
        balance_df.loc[balance_df['Particulars'] == 'Financial Liabilities: Borrowings', 'As at March 31, 2021 (₹ crore)'].values[0] +
        balance_df.loc[balance_df['Particulars'] == 'Financial Liabilities: Borrowings', 'As at March 31, 2021 (₹ crore)'].values[1]
    )
    revenue_2021 = income_df.loc[income_df['Particulars'] == 'Revenue from Operations', 'FY2020-21 (₹ crore)'].values[0]
    net_income_2021 = income_df.loc[income_df['Particulars'] == 'Profit/(Loss) for the Year', 'FY2020-21 (₹ crore)'].values[0]
    ebit_2021 = (
        income_df.loc[income_df['Particulars'] == 'Profit/(Loss) Before Exceptional Items and Tax', 'FY2020-21 (₹ crore)'].values[0] +
        income_df.loc[income_df['Particulars'] == 'Finance Costs', 'FY2020-21 (₹ crore)'].values[0]
    )
    interest_expense_2021 = income_df.loc[income_df['Particulars'] == 'Finance Costs', 'FY2020-21 (₹ crore)'].values[0]
    
    # Calculate trade receivables - for turnover ratios
    trade_receivables_2022 = balance_df.loc[balance_df['Particulars'] == 'Financial Assets: Trade Receivables', 'As at March 31, 2022 (₹ crore)'].values[0] + balance_df.loc[balance_df['Particulars'] == 'Financial Assets: Trade Receivables', 'As at March 31, 2022 (₹ crore)'].values[1]
    trade_receivables_2021 = balance_df.loc[balance_df['Particulars'] == 'Financial Assets: Trade Receivables', 'As at March 31, 2021 (₹ crore)'].values[0] + balance_df.loc[balance_df['Particulars'] == 'Financial Assets: Trade Receivables', 'As at March 31, 2021 (₹ crore)'].values[1]
    
    # Average values for ratio calculations
    avg_total_assets = (total_assets_2022 + total_assets_2021) / 2
    avg_trade_receivables = (trade_receivables_2022 + trade_receivables_2021) / 2
    avg_inventory = (inventory_2022 + inventory_2021) / 2
    
    # Liquidity Ratios
    ratios['Liquidity Ratios']['Current Ratio (FY2022)'] = current_assets_2022 / current_liabilities_2022
    ratios['Liquidity Ratios']['Current Ratio (FY2021)'] = current_assets_2021 / current_liabilities_2021
    
    ratios['Liquidity Ratios']['Quick Ratio (FY2022)'] = (current_assets_2022 - inventory_2022) / current_liabilities_2022
    ratios['Liquidity Ratios']['Quick Ratio (FY2021)'] = (current_assets_2021 - inventory_2021) / current_liabilities_2021
    
    ratios['Liquidity Ratios']['Cash Ratio (FY2022)'] = cash_equivalents_2022 / current_liabilities_2022
    ratios['Liquidity Ratios']['Cash Ratio (FY2021)'] = cash_equivalents_2021 / current_liabilities_2021
    
    # Leverage Ratios
    ratios['Leverage Ratios']['Debt to Equity (FY2022)'] = total_debt_2022 / total_equity_2022
    ratios['Leverage Ratios']['Debt to Equity (FY2021)'] = total_debt_2021 / total_equity_2021
    
    ratios['Leverage Ratios']['Debt to Assets (FY2022)'] = total_debt_2022 / total_assets_2022
    ratios['Leverage Ratios']['Debt to Assets (FY2021)'] = total_debt_2021 / total_assets_2021
    
    ratios['Leverage Ratios']['Interest Coverage Ratio (FY2022)'] = ebit_2022 / interest_expense_2022
    ratios['Leverage Ratios']['Interest Coverage Ratio (FY2021)'] = ebit_2021 / interest_expense_2021
    
    # Turnover Ratios
    ratios['Turnover Ratios']['Asset Turnover (FY2022)'] = revenue_2022 / avg_total_assets
    ratios['Turnover Ratios']['Asset Turnover (FY2021)'] = revenue_2021 / avg_total_assets
    
    ratios['Turnover Ratios']['Receivables Turnover (FY2022)'] = revenue_2022 / avg_trade_receivables
    ratios['Turnover Ratios']['Receivables Turnover (FY2021)'] = revenue_2021 / avg_trade_receivables
    
    ratios['Turnover Ratios']['Inventory Turnover (FY2022)'] = revenue_2022 / avg_inventory
    ratios['Turnover Ratios']['Inventory Turnover (FY2021)'] = revenue_2021 / avg_inventory
    
    # Profitability Ratios
    ratios['Profitability Ratios']['Net Profit Margin (FY2022)'] = net_income_2022 / revenue_2022
    ratios['Profitability Ratios']['Net Profit Margin (FY2021)'] = net_income_2021 / revenue_2021
    
    ratios['Profitability Ratios']['Return on Assets (ROA) (FY2022)'] = net_income_2022 / avg_total_assets
    ratios['Profitability Ratios']['Return on Assets (ROA) (FY2021)'] = net_income_2021 / avg_total_assets
    
    ratios['Profitability Ratios']['Return on Equity (ROE) (FY2022)'] = net_income_2022 / total_equity_2022
    ratios['Profitability Ratios']['Return on Equity (ROE) (FY2021)'] = net_income_2021 / total_equity_2021
    
    # DuPont Analysis
    ratios['DuPont Analysis']['Net Profit Margin (FY2022)'] = net_income_2022 / revenue_2022
    ratios['DuPont Analysis']['Net Profit Margin (FY2021)'] = net_income_2021 / revenue_2021
    
    ratios['DuPont Analysis']['Asset Turnover (FY2022)'] = revenue_2022 / avg_total_assets
    ratios['DuPont Analysis']['Asset Turnover (FY2021)'] = revenue_2021 / avg_total_assets
    
    ratios['DuPont Analysis']['Equity Multiplier (FY2022)'] = total_assets_2022 / total_equity_2022
    ratios['DuPont Analysis']['Equity Multiplier (FY2021)'] = total_assets_2021 / total_equity_2021
    
    ratios['DuPont Analysis']['ROE (FY2022)'] = (ratios['DuPont Analysis']['Net Profit Margin (FY2022)'] * 
                                                ratios['DuPont Analysis']['Asset Turnover (FY2022)'] * 
                                                ratios['DuPont Analysis']['Equity Multiplier (FY2022)'])
    
    ratios['DuPont Analysis']['ROE (FY2021)'] = (ratios['DuPont Analysis']['Net Profit Margin (FY2021)'] * 
                                                ratios['DuPont Analysis']['Asset Turnover (FY2021)'] * 
                                                ratios['DuPont Analysis']['Equity Multiplier (FY2021)'])
    
    return pd.DataFrame([(k1, k2, v) for k1, d in ratios.items() for k2, v in d.items()], 
                       columns=['Ratio Category', 'Ratio', 'Value'])

# Create Excel file
with pd.ExcelWriter('Tata_Power_Financial_Analysis.xlsx') as writer:
    income_statement.to_excel(writer, sheet_name='Income Statement', index=False)
    balance_sheet.to_excel(writer, sheet_name='Balance Sheet', index=False)
    cash_flow.to_excel(writer, sheet_name='Cash Flow', index=False)
    equity_changes.to_excel(writer, sheet_name='Equity Changes', index=False)
    
    # Calculate and add ratios
    ratios_df = calculate_ratios(income_statement, balance_sheet, cash_flow)
    ratios_df.to_excel(writer, sheet_name='Financial Ratios', index=False)

print("Financial data extraction completed and exported to 'Tata_Power_Financial_Analysis.xlsx'")