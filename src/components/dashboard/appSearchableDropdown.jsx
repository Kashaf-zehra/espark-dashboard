import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import Input from './input';
import Skeleton from '@mui/material/Skeleton';
import { filterDataByKeyword } from '@/src/utils/search';

const AppSearchableDropdown = ({
  selectedItem,
  isLoadingList,
  setIsLoadingList,
  setSelectedItem,
  data,
  md,
  withFlag,
  error,
  placeholder,
  width,
}) => {
  const [isOpenedDropdown, setIsOpenedDropdown] = useState(false);
  const [listData, setListData] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [pointedElement, setPointedElement] = useState();

  useEffect(() => {
    setListData([...data]);
    setPointedElement(selectedItem);
  }, [data, selectedItem]);

  const componentRef = useRef(null);
  useEffect(() => {
    const tempData = [...data];
    const timeoutId = setTimeout(() => {
      filterDataByKeyword(tempData, searchItem.trim() || '', setListData);
      setIsLoadingList(false);
      console.log({ searchItem });
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchItem, data]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        setIsOpenedDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (isOpenedDropdown && pointedElement && componentRef.current) {
      const selectedElement = withFlag
        ? componentRef.current.querySelector(
            `[data-key="${pointedElement?.title}"]`
          )
        : componentRef.current.querySelector(`[data-key="${pointedElement}"]`);
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start',
        });
      }
    }
  }, [isOpenedDropdown, pointedElement]);
  const toggleComponent = () => {
    setIsOpenedDropdown((ps) => !ps);
  };
  const handleKeyDown = (event) => {
    if (!isOpenedDropdown) {
      return;
    }
    const selectedIndex = listData.indexOf(pointedElement);
    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        const nextIndex = Math.min(selectedIndex + 1, listData.length - 1);
        setPointedElement(listData[nextIndex]);
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const prevIndex = Math.max(selectedIndex - 1, 0);
        setPointedElement(listData[prevIndex]);
        break;
      }
      case 'Enter': {
        event.preventDefault();
        setSearchItem('');
        setSelectedItem(pointedElement);
        setIsOpenedDropdown(false);
        break;
      }
      case 'Escape': {
        event.preventDefault();
        setPointedElement(selectedItem);
        setIsOpenedDropdown(false);
        break;
      }
      default:
        break;
    }
  };
  return (
    <Grid sx={{ position: 'relative' }} item xs={12} md={md || 6}>
      <Box ref={componentRef} sx={{ display: 'flex', gap: '2px' }}>
        <Box
          onClick={toggleComponent}
          display={'flex'}
          justifyContent={'space-between'}
          sx={{
            border: `solid 1px ${error ? 'red' : '#ccc'}`,
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px',
            // borderRadius:'5px',
            borderBottomLeftRadius: !isOpenedDropdown && '5px',
            borderBottomRightRadius: !isOpenedDropdown && '5px',
            width: width || '400px',
            height: '43px',
          }}
          p={'10px'}
        >
          {withFlag ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box
                component={'img'}
                alt={selectedItem?.titme}
                src={selectedItem?.flag}
                sx={{
                  width: '35px',
                  height: '20px',
                  mr: '20px',
                }}
              />
              <Box>
                <Typography>{selectedItem?.title}</Typography>
              </Box>
            </Box>
          ) : (
            <Typography sx={{ color: selectedItem ? '#000' : '#838383' }}>
              {selectedItem?.label ||
                selectedItem?.name ||
                selectedItem ||
                placeholder ||
                'Select Employee'}
            </Typography>
          )}

          {isOpenedDropdown ? (
            <Image
              src={'/images/hiring/icon-down.svg'}
              width={25}
              height={25}
              alt="Dropdown"
            />
          ) : (
            <Image
              src={'/icons/Dropdown.svg'}
              width={15}
              height={15}
              alt="Dropdown"
            />
          )}
        </Box>
        {isOpenedDropdown && (
          <Box
            sx={{
              border: 'solid 1px #ccc',
              borderRadius: '5px',
              overflow: 'hidden',
              // borderBottomLeftRadius: '5px',
              // borderBottomRightRadius: '5px',
              borderTopLeftRadius: !isOpenedDropdown && '5px',
              borderTopRightRadius: !isOpenedDropdown && '5px',
              // borderTop: 'none',
              position: 'absolute',
              width: '100%',
              background: '#fff',
              zIndex: 1,
            }}
          >
            <Box
              width="100%"
              p={'10px'}
              position="sticky"
              top="0"
              sx={{ background: '#fff', zIndex: 1 }}
              height={'43px'}
            >
              <Input
                setIsLoading={setIsLoadingList}
                handleChange={setSearchItem}
                value={searchItem}
                prefixIcon="SearchIcon.svg"
                width={'100%'}
                onKeyDown={handleKeyDown}
                autofocus
              />
            </Box>
            <Box
              maxHeight="250px"
              sx={{
                overflow: 'auto',
                scrollbarWidth: 'thin',
                mt: '10px',
                scrollbarColor: 'transparent transparent',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
            >
              {isLoadingList ? (
                <Box p={'10px'}>
                  <Skeleton
                    animation="wave"
                    width={'100%'}
                    height={40}
                    sx={{ background: '#F6F6F6' }}
                  />
                </Box>
              ) : listData?.length ? (
                listData?.map((item, index) => {
                  if (withFlag) {
                    return (
                      <Box
                        onClick={() => {
                          setSearchItem('');
                          setSelectedItem(item);
                          setPointedElement(item);
                          setIsOpenedDropdown(false);
                        }}
                        key={index}
                        data-key={item?.title}
                        className={`list-item-box ${
                          item?.title === selectedItem?.title ||
                          item?.title === pointedElement?.title
                            ? 'selected-list-item'
                            : ''
                        }`}
                        p={'10px'}
                        sx={{
                          '&::-webkit-scrollbar': {
                            display: 'none',
                          },
                          scrollbarWidth: 'none',
                          '-ms-overflow-style': 'none',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <Box
                            component={'img'}
                            alt={item?.titme}
                            src={item?.flag}
                            sx={{
                              width: '35px',
                              height: '20px',
                              mr: '20px',
                            }}
                          />
                          <Box>
                            <Typography>{item?.title}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    );
                  } else {
                    return (
                      <Box
                        onClick={() => {
                          if (item?.disabled) {
                            return;
                          } else {
                            setSearchItem('');
                            setSelectedItem(item);
                            setPointedElement(item);
                            setIsOpenedDropdown(false);
                          }
                        }}
                        key={index}
                        data-key={item}
                        className={`list-item-box ${
                          item === selectedItem || item === pointedElement
                            ? 'selected-list-item'
                            : ''
                        }`}
                        p={'10px'}
                        sx={{
                          backgroundColor: item.disabled && '#eee',
                          cursor: item.disabled ? 'no-drop' : 'pointer',
                          mb: '2px',
                          '&:hover': {
                            backgroundColor: !item.disabled && '#e6f5f4',
                          },
                          '&:hover::before': {
                            backgroundColor: !item.disabled && '#068987',
                          },
                          '&::-webkit-scrollbar': {
                            display: 'none',
                          },
                          scrollbarWidth: 'none',
                          '-ms-overflow-style': 'none',
                        }}
                      >
                        <Typography>
                          {item?.label || item?.name || item}
                        </Typography>
                      </Box>
                    );
                  }
                })
              ) : (
                <Box p={'10px'}>
                  <Typography>No item found</Typography>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Grid>
  );
};

AppSearchableDropdown.propTypes = {
  selectedItem: PropTypes.string.isRequired,
  isLoadingList: PropTypes.bool.isRequired,
  setIsLoadingList: PropTypes.func.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

export default AppSearchableDropdown;
