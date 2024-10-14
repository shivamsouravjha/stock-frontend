import {
  DeleteIcon,
  Search,
  LayoutGrid,
  List,
  ExternalLink,
  StarIcon,
} from 'lucide-react'
import PropsTypes from 'prop-types'
import { Button } from './ui/button'
import { toNumber } from '../utils/common'
import StockCard from './StockCard'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from './ui/dropdown-menu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'

const Result = ({
  stockDetails,
  search,
  setSearch,
  shortBy,
  setShortBy,
  isGridView,
  setIsGridView,
}) => {
  return (
    <div className="pt-20 container mx-auto flex flex-col h-screen p-2">
      <div className="py-2 rounded-md flex-col gap-y-2 sm:gap-y-0 sm:flex-row flex justify-between items-center px-3">
        <div className="flex items-center gap-5 w-full sm:w-fit">
          <div className="flex bg-white dark:bg-black w-full sm:w-fit py-2 border-[0.5px] rounded-md items-center gap-2 px-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              className="px-2 outline-none w-full dark:bg-black dark:text-white"
              placeholder="Search..."
              value={search}
              onChange={(ev) => setSearch(ev.target.value)}
            />
          </div>
          <Button
            onClick={() => {
              setIsGridView(!isGridView)
            }}
          >
            {isGridView ? <LayoutGrid></LayoutGrid> : <List></List>}
          </Button>
        </div>
        <div className="flex gap-3 w-full sm:w-fit  items-center justify-between sm:justify-normal ">
          <DropdownMenu className="flex-shrink-0">
            <DropdownMenuTrigger asChild>
              <Button
                size="small"
                className="flex items-center gap-2 px-2 py-2"
              >
                Sort by
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  setShortBy('rating')
                }}
              >
                Rating
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setShortBy('market_cap')
                }}
              >
                Market Value
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setShortBy('quantity')
                }}
              >
                Quantity
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setShortBy('percentage_of_aum')
                }}
              >
                Percentage of AUM
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setShortBy('fScore')
                }}
              >
                FScore
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            onClick={() => {
              setShortBy('none')
              setSearch('')
            }}
            size="small"
            className="gap-2 py-[6px] px-2"
          >
            <span>Reset</span>
            <DeleteIcon width={24} height={24} />
          </Button>
        </div>
      </div>
      {isGridView ? (
        <div className="gap-3 mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-grow overflow-auto">
          {stockDetails
            .filter((item) => {
              if (!search) {
                return true
              } else {
                let isValid = false

                Object.values(item).forEach((value) => {
                  if (
                    value &&
                    value
                      .toString()
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  ) {
                    isValid = true
                  }
                })

                return isValid
              }
            })
            .sort((a, b) => {
              if (shortBy === 'rating') {
                return toNumber(a.stockRate) - toNumber(b.stockRate)
              } else if (shortBy === 'market_cap') {
                return (
                  toNumber(a['Market/Fair Value']) -
                  toNumber(b['Market/Fair Value'])
                )
              } else if (shortBy === 'quantity') {
                return toNumber(a.Quantity) - toNumber(b.Quantity)
              } else if (shortBy === 'percentage_of_aum') {
                return (
                  toNumber(a['Percentage of AUM']) -
                  toNumber(b['Percentage of AUM'])
                )
              } else if (shortBy === 'fScore') {
                return toNumber(a.fScore) - toNumber(b.fScore)
              } else {
                return 0
              }
            })
            .map((stockData) => (
              <StockCard key={stockData.ISIN} stockData={stockData} />
            ))}
        </div>
      ) : (
        <Table>
          <TableHeader className="sticky top-0 bg-slate-100 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800">
            <TableRow>
              <TableHead className="text-black dark:text-white">Name</TableHead>
              <TableHead className="text-black dark:text-white">
                Industry
              </TableHead>
              <TableHead className="text-black dark:text-white">ISIN</TableHead>
              <TableHead className="text-black dark:text-white">
                Rating
              </TableHead>
              <TableHead className="text-black dark:text-white">
                Market Value
              </TableHead>
              <TableHead className="text-black dark:text-white">
                Market Cap
              </TableHead>
              <TableHead className="text-black dark:text-white">
                Quantity
              </TableHead>
              <TableHead className="text-black dark:text-white">
                FScore
              </TableHead>
              <TableHead className="text-black dark:text-white">
                % of AUM
              </TableHead>
              <TableHead className="text-black dark:text-white">
                View Details
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockDetails
              .filter((item) => {
                if (!search) {
                  return true
                } else {
                  let isValid = false

                  Object.values(item).forEach((value) => {
                    if (
                      value &&
                      value
                        .toString()
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    ) {
                      isValid = true
                    }
                  })

                  return isValid
                }
              })
              .sort((a, b) => {
                if (shortBy === 'rating') {
                  return toNumber(a.stockRate) - toNumber(b.stockRate)
                } else if (shortBy === 'market_cap') {
                  return (
                    toNumber(a['Market/Fair Value']) -
                    toNumber(b['Market/Fair Value'])
                  )
                } else if (shortBy === 'quantity') {
                  return toNumber(a.Quantity) - toNumber(b.Quantity)
                } else if (shortBy === 'percentage_of_aum') {
                  return (
                    toNumber(a['Percentage of AUM']) -
                    toNumber(b['Percentage of AUM'])
                  )
                } else if (shortBy === 'fScore') {
                  return toNumber(a.fScore) - toNumber(b.fScore)
                } else {
                  return 0
                }
              })
              .map((stockData) => (
                <TableRow key={stockData.ISIN}>
                  <TableCell>{stockData['Name of the Instrument']}</TableCell>
                  <TableCell>{stockData['Industry/Rating']}</TableCell>

                  <TableCell>{stockData.ISIN}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <StarIcon className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span>{stockData.stockRate}</span>
                    </div>
                  </TableCell>

                  <TableCell>{stockData['Market/Fair Value']}</TableCell>
                  <TableCell>{stockData.marketCapValue}</TableCell>
                  <TableCell>{stockData.Quantity}</TableCell>
                  <TableCell>{stockData.fScore}</TableCell>
                  <TableCell>{stockData['Percentage of AUM']}</TableCell>

                  <TableCell>
                    <a
                      href={stockData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" text-blue-600 hover:underline"
                    >
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

Result.propTypes = {
  stockDetails: PropsTypes.array,
  search: PropsTypes.string,
  setSearch: PropsTypes.func,
  shortBy: PropsTypes.string,
  setShortBy: PropsTypes.func,
  isGridView: PropsTypes.bool,
  setIsGridView: PropsTypes.func,
}

export default Result
